import './about.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const About = ()=>(
    <div>
        <div className="about">
            <h3><b>About App</b></h3>
            <p>
                The project ‘DIGI ID’ is a decentralized 
                application (DApp) that seeks to provide a  
                platform to all the users belonging to a 
                specific organization, community, country, 
                or even for worldwide use. ‘DIGI ID’ provides 
                a decentralized system using blockchain to 
                store all the information securely by the user 
                and also ensures data encapsulation and 
                protection using asymmetric algorithm 
                ECDSA (Elliptic Curve Digital Signature Algorithm).
            </p>
            <p>
                The project tends to offer a secured 
                application where a user can create any 
                digital identity, encrypt it using his 
                public/private keys and store it on a 
                secure decentralized storage system IPFS. 
                This storage data is published on blockchain 
                in encrypted form using asymmetric encryptions 
                and empowers a user to share these identities 
                securely. Also, the issuers are allowed to 
                digitally sign all the identities for 
                verification of data using the public-private 
                key encryption.
            </p>
        </div>
        <div className="about">
            <h3><b>Requirements</b></h3>
            <p>1.  MetaMask Wallet. 
                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="blank">
                    (Download from here)
                </a>
            </p>
            <p>2.  Some ropston test ethers in your MetaMask Account. 
                <a href="https://faucet.ropsten.be/" target="blank">
                    (Get test ethers from here)
                </a>
            </p>
        </div>
        <div className="about">
            <h3><b>About Developer</b></h3>
            <p>
                This app is solemnly developed by Aman Gupta, 
                a Blockchain and fullStack Web Developer.
            </p>
            <p>
                All the graphics have been taken from opensource 
                sources and the developer holds no right over them.
            </p>
            <p>
                Inspiration has been taken from various research papers and 
                digital identity models.
            </p>
            <p>
                <a href="https://www.linkedin.com/in/aman-gupta-2001/" target="blank"><LinkedInIcon className="icon" sx={{fontSize : "35px"}}/></a>
                <a href="https://github.com/Aman035" target="blank"><GitHubIcon  className="icon" sx={{fontSize : "35px"}}/></a>
                <a href="https://twitter.com/m_AmanGupta" target="blank"><TwitterIcon className="icon" sx={{fontSize : "35px"}}/></a>
            </p>
        </div>
    </div>
    
)
export default About;