import React from 'react';
import './header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import Tooltip from '@mui/material/Tooltip';

const mapStateToProps = state => {
    return {
      Auth : state.Auth,
	  IssuerRequest : state.IssuerRequest,
	  User : state.User
    }
}

const Header = (props)=>{

	const tabs = [
	{
		title : "Profile",
		link : "/profile",
		icon : <AccountCircleIcon color="primary" fontSize="large"/>,
		private : true
	},
	{
		title : "Issuer Profile",
		link : "/issuer",
		icon : <SupervisorAccountRoundedIcon color="primary" fontSize="large"/>,
		private : true
	},
	{
		title : "Home",
		link : "/home",
		icon : <HomeRoundedIcon color="primary" fontSize="large"/>,
		private : false
	},
	{
		title : "About App & Developer",
		link : "/about",
		icon : <InfoIcon color="primary" fontSize="large"/>,
		private : false
	}
]

	return (
		<div className="header">
			<span className="align">
				{props.User.info.address!=="" && props.User.info.address.toLowerCase() ===  props.IssuerRequest.info.address.toLowerCase()?
				<div className="customNav">
					<Tooltip title={<h6>Issuer Verification</h6>} arrow placement="right">
						<Link to="/verifyissuer">
							<AdminPanelSettingsRoundedIcon color="primary" fontSize="large"/>
						</Link>
					</Tooltip>
				</div>
				:null
				}
				{tabs.map(tab => (
					props.Auth.isAuthenticated || (!tab.private)?
						<div className="customNav" key={tab.title}>
							<Tooltip title={<h6>{tab.title}</h6>} arrow placement="right">
								<Link to={tab.link}>{tab.icon}</Link>
							</Tooltip>
						</div>
					:
					null	
				))}
			</span>
		</div>
	);
}

export default connect(mapStateToProps,null)(Header);
