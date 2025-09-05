export class Player {
  speed: number;
  life: number;

  /**
   * Creates a new Player instance.
   * @param initialSpeed The starting speed of the player.
   * @param initialLife The starting number of lives for the player.
   */
  constructor(initialSpeed: number, initialLife: number) {
    this.speed = initialSpeed;
    this.life = initialLife;
  }

  /**
   * Calculates the final speed based on a given speed and incline.
   * @param speed The current speed of the object.
   * @param incline A list of incline values.
   * @returns The calculated final speed.
   */
  calculate_final_speed(initialSpeed: number, incline: number[]): number {
    // using reduce to calculate the final speed
    const finalSpeed = incline.reduce((sum, val) => sum - val, initialSpeed);

    // if speed goes below or equal 0 life minus 1
    if (finalSpeed <= 0) {
      this.life -= 1;
    }
    // Ensure speed doesn't go below zero.
    return Math.max(0, finalSpeed);
  }
}
