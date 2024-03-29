class CharacterFactory {
  createCharacter(attributes) {
    if (attributes.character === "Kenji") {
      return new Kenji({
        position: attributes.position,
        velocity: attributes.velocity,
        lastKey: attributes.lastKey,
        scale: attributes.scale,
        offset: {
          x: 215,
          y: 167,
        },
        attackBox: attributes.attackBox,
      });
    } else if (attributes.character === "SamuraiMack") {
      return new SamuraiMack({
        position: attributes.position,
        velocity: attributes.velocity,
        lastKey: attributes.lastKey,
        scale: attributes.scale,
        offset: {
          x: 215,
          y: 157,
        },
        attackBox: attributes.attackBox,
      });
    }

    return null;
  }
}
