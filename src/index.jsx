import React from 'react';
import ReactDOM from 'react-dom';
import Candidate from './candidate.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
    }
    this.loadCandidates = this.loadCandidates.bind(this);
    this.addCandidate  = this.addCandidate.bind(this);
    this.addVote = this.addVote.bind(this);
  }

  componentDidMount() {
    this.loadCandidates();
  }

  loadCandidates() {
    fetch('/getCandidates')
    .then(response => response.json())
    .then(candidates => this.setState({
      candidates: candidates
    }))
  }

  addCandidate() {
    fetch('/addCandidate', {
      method: 'POST',
      body: JSON.stringify({name: document.getElementById('candidateField').value}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( result => result.json())
    .then(candidate => {
      var candidatesCopy = this.state.candidates.slice();
      candidatesCopy.push({name: candidate.name, votes: candidate.votes});
      this.setState({
        candidates: candidatesCopy,
      })
    }).then(this.loadCandidates())
    .catch(function(error) {
      console.log('error in addCandidate---------------------------', error);
    })
  }

  addVote() {
    console.log(event.target.id);
    fetch('/addVote', {
      method: 'PUT',
      body: JSON.stringify({name: event.target.id}),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(this.loadCandidates())
    .catch(function(error) {
      console.log('error in addVote----------', error)
    })

  }



  render() {
    return (
      <div>
        <input id="candidateField" type="text" defaultValue="Enter Candidate Here..."></input>
        <input id="submitCandidate" type="submit" onClick={this.addCandidate}></input>
        {this.state.candidates.map(candidate => <Candidate name={candidate.name} votes={candidate.votes}  addVote={this.addVote}/>)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('upvotes'));