// function to toggle accordions for challenge display

function toggleAccordion(containerId) {
    
  var container = document.getElementById(containerId);

  if (container.style.display === 'none') {
    container.style.display = 'block';
  } 
  else {
    container.style.display = 'none';
  }
  
}



