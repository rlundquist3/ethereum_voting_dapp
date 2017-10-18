web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votes","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesForCandidate","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"names","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0xa448adfcc0d39ecf2d323e37c580afeb23438f07');
candidates = {
  'Bender': 'candidate-1',
  'Fry': 'candidate-2',
  'Leela': 'candidate-3'
}

function voteForCandidate(candidate) {
  name = $('#candidate').val();
  try {
    contractInstance.voteForCandidate(name, {from: web3.eth.accounts[0]}, function () {
      let div_id = candidates[name];
      $('#'+div_id).html(contractInstance.totalVotesForCandidate.call(name).toString());
    });
  } catch (err) {

  }
}

$(document).ready(function () {
  names = Object.keys(candidates)
  for (var i = 0; i < names.length; i++) {
    let name = names[i];
    let val = contractInstance.totalVotesForCandidate.call(name).toString();
    $('#'+candidates[name]).html(val);
  }
});
