class CharacterFactory {
  createCharacter(attributes) {
    if (attributes.character === "Kenji") {
      return new Kenji({
        player: attributes.player,
        position: attributes.position,
        velocity: attributes.velocity,
        scale: attributes.scale,
        offset: {
          x: 215,
          y: 167,
        },
        attackBox: attributes.attackBox,
        controls: attributes.controls,
      });
    } else if (attributes.character === "SamuraiMack") {
      return new SamuraiMack({
        player: attributes.player,
        position: attributes.position,
        velocity: attributes.velocity,
        scale: attributes.scale,
        offset: {
          x: 215,
          y: 157,
        },
        attackBox: attributes.attackBox,
        controls: attributes.controls,
      });
    }

    return null;
  }
}
