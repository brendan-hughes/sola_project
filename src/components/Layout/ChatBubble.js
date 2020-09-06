import React, { Fragment, Component } from 'react';
import { viewedBubble } from '../../actions/nav';
import { sendEmail } from '../../actions/contact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Navbar/navbar.css';

class ChatBubble extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: '',
		};
	}
	componentDidMount() {
		setTimeout(() => {
			if (this.props.didViewBubble === false) {
				const chatBubble = document.querySelector('.chatBubble');
				chatBubble.classList.remove('chatBubbleHidden');
				setTimeout(() => {
					chatBubble.classList.add('fadeChatBubble');
				}, 2000);
			}
		}, 2000);
	}
	render() {
		return (
			<Fragment>
				<div className="chatBubble chatBubbleHidden">
					<button
						className="exitChatBubble"
						onClick={() => {
							const chatBubble = document.querySelector('.chatBubble');
							chatBubble.classList.add('chatBubbleHidden');
							chatBubble.classList.remove('fadeChatBubble');
							this.props.viewedBubble();
						}}
					>
						X
					</button>
					<p className="chatBubbleHeader">Welcome to Sola!</p>
					<p className="chatBubbleSubheader">Join the Sola Network:</p>
					<div
						className="newsletterSignupContainer"
						id="chatBubbleSignupContainer"
					>
						<input
							className="newsletterInput"
							id="chatBubbleInput"
							type="email"
							placeholder="Email Address"
							onChange={(e) => {
								this.setState({ userEmail: e.target.value });
							}}
						/>
						<button
							className="newsletterButton chatBubbleButton"
							onClick={(e) => {
								this.props.sendEmail(this.state.userEmail);
								this.props.viewedBubble();
								const chatBubble = document.querySelector('.chatBubble');
								chatBubble.classList.add('chatBubbleHidden');
								chatBubble.classList.remove('fadeChatBubble');
							}}
						>
							Sign Up
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	didViewBubble: state.nav.viewedBubble,
});

export default connect(mapStateToProps, { viewedBubble, sendEmail })(
	ChatBubble
);
