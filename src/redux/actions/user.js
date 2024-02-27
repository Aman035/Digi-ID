import * as ActionTypes from './actionTypes'
import { alert } from './alert'
import Identity from '../../Identity'
import Store from '../store'
import { upload } from '@spheron/browser-upload'
import web3 from '../../web3'
var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')
var _ = require('lodash')

//update user info in redux store
export const updateUserInfo = (account) => async (dispatch) => {
  try {
    const info = await getUserInfo(account)
    const state = Store.getState()
    if (!_.isEqual(info, state.User.info)) dispatch(userinfoSuccess(info))
  } catch (err) {
    dispatch(userinfoError(err.message))
  }
}

//get User's Info from blockchain
export const getUserInfo = async (account) => {
  let info = {
    address: account,
    identity: [],
    registered: false,
    publicKey: '',
    issuer: {
      status: '0',
      description: '',
      id: '',
      pendingRequest: [],
      acceptedRequest: [],
      rejectedRequest: [],
    },
  }

  const userData = await Identity.methods
    .UserDetail(account)
    .call({ from: account })
  const issuerData = await Identity.methods
    .IssuerDetail(account)
    .call({ from: account })
  const totalId = await Identity.methods.totalId().call({ from: account })
  const totalRequest = await Identity.methods
    .totalRequest()
    .call({ from: account })
  info.identity = await getIds(0, totalId, account, [])
  info = await getRequests(0, totalRequest, account, info)
  info.registered = userData.Registered
  info.publicKey = userData.PublicKey
  info.issuer.status = issuerData.Status
  info.issuer.description = issuerData.Desc
  info.issuer.id = issuerData.IssueId
  return info
}

const getIds = async (num, total, account, ids) => {
  if (num < total) {
    const identity = await Identity.methods
      .getId(num, account)
      .call({ from: account })
    const Id = {
      num: num,
      name: identity.Name,
      hash: identity.Hash,
      owner: identity.Owner,
      issuer: identity.Issuer,
      ownerSignature: identity.OwnerSignature,
      issuerSignature: identity.IssuerSignature,
    }
    ids.push(Id)
    return await getIds(num + 1, total, account, ids)
  } else return ids
}

const getRequests = async (num, total, account, info) => {
  if (num < total) {
    let rqData = await Identity.methods.getRequest(num).call({ from: account })
    const request = {
      requestNo: num,
      owner: '',
      hash: '',
      status: '',
    }
    request.status = rqData.Status
    request.owner = rqData.Owner
    request.hash = rqData.Hash

    if (request.status === '1') info.issuer.pendingRequest.push(request)

    if (request.status === '2') info.issuer.acceptedRequest.push(request)

    if (request.status === '0') info.issuer.rejectedRequest.push(request)

    return await getRequests(num + 1, total, account, info)
  } else return info
}

export const requestIssuerAccount =
  (account, description, id) => async (dispatch) => {
    try {
      await Identity.methods
        .requestIssuerAccount(description, id)
        .send({ from: account })
    } catch (err) {
      dispatch(alert(err.message, 'error'))
    }
  }

/**
 * IPFS UPLOAD FN USING BACKEND
 */
const uploadToIPFS = async (file) => {
  // Rename file
  const renamedFile = new File([file], 'id', {
    type: file.type,
  })

  // This server is used for initiating the upload
  // same server for w3-exam
  const response = await fetch(
    `https://joyous-moth-umbrella.cyclic.app/api/ipfs/initiate-upload`
  )
  const resJson = await response.json()
  const token = resJson.uploadToken

  let currentlyUploaded = 0
  const { protocolLink } = await upload([renamedFile], {
    token,
    onChunkUploaded: (uploadedSize, totalSize) => {
      currentlyUploaded += uploadedSize
      console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`)
    },
  })
  return `${protocolLink}/id`
}

export const addId = (issuer, buffer, account, pbk, id) => async (dispatch) => {
  try {
    // upload file to ipfs
    const hash = await uploadToIPFS(buffer)

    const sign = await web3.eth.personal.sign(id, account)

    const encrypted_IPFS_hash = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt(pbk, { data: hash }, 'x25519-xsalsa20-poly1305')
        ),
        'utf8'
      )
    )

    const Issuer_Data = await Identity.methods
      .UserDetail(issuer)
      .call({ from: account })
    const encrypted_issuer_hash = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt(
            Issuer_Data.PublicKey,
            { data: hash },
            'x25519-xsalsa20-poly1305'
          )
        ),
        'utf8'
      )
    )

    await Identity.methods
      .newId(encrypted_IPFS_hash, issuer, sign, encrypted_issuer_hash)
      .send({ from: account })
  } catch (err) {
    dispatch(alert(err.message, 'error'))
  }
}

export const acceptRequest = (num, account, id, owner) => async (dispatch) => {
  try {
    const msg = id + ' : ' + owner.toLowerCase()
    const sign = await web3.eth.personal.sign(msg, account)
    await Identity.methods.AcceptIdRequest(num, sign).send({ from: account })
  } catch (err) {
    dispatch(alert(err.message, 'error'))
  }
}

export const rejectRequest = (num, account) => async (dispatch) => {
  try {
    await Identity.methods.RejectIdRequest(num).send({ from: account })
  } catch (err) {
    dispatch(alert(err.message, 'error'))
  }
}

export const decrypt = (msg, account) => async (dispatch) => {
  try {
    const decrypted = await window.ethereum.request({
      method: 'eth_decrypt',
      params: [msg, account],
    })
    return decrypted
  } catch (err) {
    dispatch(alert(err.message, 'error'))
  }
}

export const deleteId = (num, account) => async (dispatch) => {
  try {
    await Identity.methods.deleteId(num).send({ from: account })
    return true
  } catch (err) {
    dispatch(alert(err.message, 'error'))
    return false
  }
}

export const recoverFromSign = (msg, sign) => {
  if (sign === 'Rejected') return 'Issuer Has Rejected this Identity'

  if (sign === 'Pending') return 'Issuer Signature in still Pending'

  return web3.eth.accounts.recover(msg, sign)
}

const userinfoSuccess = (info) => {
  return {
    type: ActionTypes.USERINFO_SUCCESS,
    info: info,
  }
}

export const userinfoError = (err) => {
  return {
    type: ActionTypes.USERINFO_FAIL,
    err: err,
  }
}

export const changeTab = (tab) => ({
  type: ActionTypes.USERINFO_TAB_CHANGE,
  tab: tab,
})
