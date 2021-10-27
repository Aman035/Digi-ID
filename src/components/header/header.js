import React from 'react';
import './header.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<span className="align">
				<div className="customNav">
					<Tooltip title={<h6>Issuer Verification</h6>} arrow placement="right">
						<Link to="/verifyissuer">
							<AdminPanelSettingsRoundedIcon color="primary" fontSize="large" />
						</Link>
					</Tooltip>
				</div>
				<div className="customNav">
					<Tooltip title={<h6>Profile</h6>} arrow placement="right">
						<Link to="/profile">
							<AccountCircleIcon color="primary" fontSize="large" />
						</Link>
					</Tooltip>
				</div>
				<div className="customNav">
					<Tooltip title={<h6>Issuer Profile</h6>} arrow placement="right">
						<Link to="/issuer">
							<SupervisorAccountRoundedIcon color="primary" fontSize="large" />
						</Link>
					</Tooltip>
				</div>
				<div className="customNav">
					<Tooltip title={<h6>Home</h6>} arrow placement="right">
						<Link to="/home">
							<HomeRoundedIcon color="primary" fontSize="large" />
						</Link>
					</Tooltip>
				</div>
				<div className="customNav">
					<Tooltip
						title={<h6>About App & Developer</h6>}
						arrow
						placement="right"
					>
						<Link to="/about">
							<InfoIcon color="primary" fontSize="large" />
						</Link>
					</Tooltip>
				</div>
				</span>
			</div>
		);
	}
}
export default Header;
