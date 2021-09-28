import React from 'react';
import './header.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="customNav">
					<Tooltip title={<h6>Profile</h6>} arrow placement="right">
						<Link to="/superprofile">
							<AccountCircleIcon color="primary" fontSize="large" />
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
			</div>
		);
	}
}
export default Header;
