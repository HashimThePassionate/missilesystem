// Initialize the missile system
let isLaunched = false;

const missileSystem = {
  launch: () => {
    if (isLaunched) return; // Prevent multiple launches
    isLaunched = true;

    const missile = document.getElementById("missile");
    const fire = document.getElementById("fire");
    const explosion = document.getElementById("explosion");
    const ground = document.getElementById("ground");
    const launchButton = document.getElementById("launchButton");
    const scene = document.getElementById("scene");
    const debrisElements = [
      document.getElementById("debris1"),
      document.getElementById("debris2"),
      document.getElementById("debris3"),
      document.getElementById("debris4"),
      document.getElementById("debris5"),
    ];

    // Disable the launch button
    launchButton.disabled = true;

    // Show the fire
    fire.style.opacity = 1;

    // Start the missile launch animation after a short delay
    setTimeout(() => {
      // Calculate dynamic translate values based on viewport size
      const translateX = window.innerWidth < 480 ? -20 : -30; // Adjust based on screen width
      const translateY = window.innerHeight < 480 ? -70 : -80; // Adjust based on screen height

      // Launch the missile towards the top-left
      missile.style.transform = `translate(${translateX}vw, ${translateY}vh) rotate(-45deg)`;
      missile.style.bottom = `${window.innerHeight < 480 ? '70vh' : '80vh'}`; // Move beyond the scene

      // After missile reaches the target, trigger explosion
      setTimeout(() => {
        // Reset missile position
        missile.style.transition = 'none';
        missile.style.transform = 'translateX(-50%) rotate(0deg)';
        missile.style.bottom = '20%'; // Align with ground

        // Hide the fire
        fire.style.opacity = 0;

        // Show explosion at missile's landing position (left side)
        explosion.style.left = '20%'; // Adjust to left side
        explosion.style.bottom = '20%'; // Align with ground
        explosion.style.opacity = '1';
        explosion.style.transform = 'scale(1)';
        explosion.style.transition = 'opacity 1s ease, transform 1s ease';

        // Trigger scene shake
        scene.classList.add('shake');
        setTimeout(() => {
          scene.classList.remove('shake');
        }, 500);

        // Break the ground segments towards the left
        const groundSegments = document.querySelectorAll('.ground-segment');
        groundSegments.forEach((segment, index) => {
          // Only animate the left side segments (e.g., first 4 segments)
          if (index < 4) { // Assuming 8 segments; adjust as needed
            setTimeout(() => {
              // Random negative translation for leftward destruction
              const translateX = Math.random() * -10 - 10; // Between -10 and -20
              const translateY = Math.random() * -10 - 10; // Between -10 and -20
              const rotateDeg = Math.random() * -360; // Negative rotation

              segment.style.transform = `translate(${translateX}vw, ${translateY}vh) rotate(${rotateDeg}deg)`;
              segment.style.opacity = '0';
            }, index * 100);
          }
        });

        // Animate debris towards the left
        debrisElements.forEach((debris, index) => {
          setTimeout(() => {
            debris.style.opacity = '1';
            const translateX = window.innerWidth < 480 ? -20 : -15; // Adjust based on screen width
            const translateY = window.innerHeight < 480 ? -30 : -20; // Adjust based on screen height
            debris.style.transform = `translate(${translateX}vw, ${translateY}vh) rotate(${Math.random() * 720}deg)`;
            debris.style.transition = 'transform 2s ease, opacity 2s ease';
          }, 500 + index * 200);
        });

        // Hide explosion after animation
        setTimeout(() => {
          explosion.style.opacity = '0';
          explosion.style.transform = 'scale(0)';

          // Reset ground segments
          groundSegments.forEach((segment) => {
            segment.style.transform = 'translate(0, 0)';
            segment.style.opacity = '1';
          });

          // Reset debris
          debrisElements.forEach((debris) => {
            debris.style.opacity = '0';
            debris.style.transform = 'translate(0, 0) rotate(0deg)';
            debris.style.transition = 'none';
          });

          // Re-enable the launch button
          launchButton.disabled = false;
          isLaunched = false;
        }, 2500); // Wait for all animations to complete
      }, 2000); // Duration of missile launch
    }, 500); // Initial delay before launch
  }
};

// Add click event listener to the launch button
document.getElementById("launchButton").addEventListener("click", () => {
  missileSystem.launch();
});
