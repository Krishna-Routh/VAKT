(function($) {

	"use strict";

	// Dropdown functionality
	$('nav .dropdown').hover(function() {
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function() {
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});

})(jQuery);

// Web3.js Integration for Connecting to Metamask
let web3;
let contractInstance;
const contractAddress = '0x508421aF9A75d78488e4BD1843E60F39BAcE546b'; // Replace with your deployed contract address
const contractABI = [ /* Your Contract ABI */ ]; // Replace with your contract's ABI

// Initialize Web3
async function initializeWeb3() {
	if (typeof window.ethereum !== 'undefined') {
		try {
			// Request accounts
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			console.log('Connected account:', accounts[0]);

			// Set up Web3 instance
			web3 = new Web3(window.ethereum);

			// Load the smart contract
			contractInstance = new web3.eth.Contract(contractABI, contractAddress);
			console.log('Contract instance loaded:', contractInstance);

			alert('Connected to Metamask!');
		} catch (error) {
			console.error('User denied account access:', error);
			alert('Please connect your wallet!');
		}
	} else {
		alert('Metamask is not installed! Please install it to use this app.');
	}
}

// Add event listener to the "Connect to Blockchain" button
document.addEventListener('DOMContentLoaded', function() {
	const connectButton = document.getElementById('connectButton');
	if (connectButton) {
		connectButton.addEventListener('click', initializeWeb3);
	}
});
