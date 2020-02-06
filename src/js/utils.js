function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};

	return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle) {
	const canvas = document.querySelector('canvas');
	const xVelocityDiff = particle.velocity.x - 0;
	const yVelocityDiff = particle.velocity.y - 0;

	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	const xDist = centerX - particle.x;
	const yDist = centerY - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		// Grab angle between the two colliding particles
		const angle = -Math.atan2(centerY - particle.y, centerX - particle.x);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = 100;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate({ x: 0, y: 0 }, angle);

		// Velocity after 1d collision equation
		const v1 = {
			x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
			y: u1.y
		};

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;
	}
}

module.exports = {
	randomIntFromRange,
	randomColor,
	distance,
	rotate,
	resolveCollision
};
