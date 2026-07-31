const BONUS_THRESHOLD = 63;
const BONUS_VALUE = 35;

function isUpperDiceScore(score) {
  return score.section === "upper" && score.modal === "dice";
}

function isFilled(score) {
  return score.internalValue !== null || score.ruleOut;
}

export function checkBonus(setGame) {
  setGame((prevGame) => {
    let hasChanges = false;

    const players = prevGame.players.map((player) => {
      const upperScores = player.scores.filter(isUpperDiceScore);
      const allUpperScoresFilled = upperScores.every(isFilled);

      if (!allUpperScoresFilled) {
        return player;
      }

      const upperScoreTotal = upperScores.reduce(
        (total, score) => total + (score.internalValue ?? 0),
        0,
      );
      const hasBonus = upperScoreTotal >= BONUS_THRESHOLD;

      const scores = player.scores.map((score) => {
        if (score.label !== "Bonus") {
          return score;
        }

        if (
          score.hasBonus === hasBonus &&
          score.isRolled === true &&
          score.internalValue === (hasBonus ? BONUS_VALUE : 0)
        ) {
          return score;
        }

        hasChanges = true;
        return {
          ...score,
          hasBonus,
          internalValue: hasBonus ? BONUS_VALUE : 0,
          isRolled: true,
          ruleOut: !hasBonus,
        };
      });

      return { ...player, hasBonus, scores };
    });
    return hasChanges ? { ...prevGame, players } : prevGame;
  });
}
