// Initialize the missile system
let approval = false;

const missileSystem = {
  launch: () => {
    const missile = document.getElementById("missile");
    const fire = document.getElementById("fire");

    // Make the fire visible and activate the flame animation
    fire.style.opacity = 1;

    // Start the missile launch animation
    setTimeout(() => {
      approval = true;
      missile.style.bottom = "100vh"; // Move missile to top
      console.log("Launched");
    }, 500); // Reduced delay for a quicker launch
  }
};

// Add click event listener to the launch button
document.getElementById("launchButton").addEventListener("click", () => {
  missileSystem.launch();
});
