// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FusionChallenge {
    struct Challenge {
        address creator;
        string criteria;
        uint256 reward;
        address[] participants;
        bool isActive;
    }

    mapping(uint256 => Challenge) public challenges;
    uint256 public challengeCount;

    event ChallengeCreated(uint256 challengeId, address creator, string criteria, uint256 reward);
    event ChallengeJoined(uint256 challengeId, address participant);
    event ChallengeCompleted(uint256 challengeId, address winner);

    function createChallenge(string memory _criteria, uint256 _reward) public {
        challengeCount++;
        challenges[challengeCount] = Challenge({
            creator: msg.sender,
            criteria: _criteria,
            reward: _reward,
            participants: new address ,
            isActive: true
        });

        emit ChallengeCreated(challengeCount, msg.sender, _criteria, _reward);
    }

    function joinChallenge(uint256 _challengeId) public {
        require(challenges[_challengeId].isActive, "Challenge is not active");
        challenges[_challengeId].participants.push(msg.sender);

        emit ChallengeJoined(_challengeId, msg.sender);
    }

    function completeChallenge(uint256 _challengeId, address _winner) public {
        require(msg.sender == challenges[_challengeId].creator, "Only creator can complete the challenge");
        require(challenges[_challengeId].isActive, "Challenge is not active");

        challenges[_challengeId].isActive = false;
        payable(_winner).transfer(challenges[_challengeId].reward);

        emit ChallengeCompleted(_challengeId, _winner);
    }
}
