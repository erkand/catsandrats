// imgswitcher

let myImage = document.querySelector('img');

myImage.onclick = function () {
  let mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/grumpy2.png') {
    myImage.setAttribute('src', 'images/grumpy.png');
  } else {
    myImage.setAttribute('src', 'images/grumpy2.png');
  }
}

// welcome message

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
  let myName = prompt('Hi stranger, what is your name?.');
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.innerHTML = 'Welcome, ' + myName;
  }
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Welcome, ' + storedName;
}


// Launchdarkly code

function main() {


  // ClientID 
  const clientSideID = '';

  // User Info 
  const user = {
    'key': 'example-user-key',
    'name': 'the_erk'
  };

  //init client (only do this once as the LDClient must be a singleton)
  const ldclient = LDClient.initialize(clientSideID, user);

  // Logging test
  let allFlagsResult = ldclient.allFlags();
  console.log(allFlagsResult)

  //function

  function render() {

    //read value stored in ld
    const flagValueDogs = ldclient.variation('dogs', false);
    const flagValueButton = ldclient.variation('button', false);

    //Show the value in the console (developer tools) for debugging purposes
    console.log(`Value of dogs button  is: ${flagValueDogs}`)
    console.log(`Value of the Button button  is: ${flagValueButton}`)

    //Get a reference to the image in the HTML code below
    //let dogCatImage = document.getElementById('imageDogCat');
    let myButton = document.getElementById('button');


    //If the flag value is 'true' we show the dog, if not we show the cat. We do this by just replacing the image source
    //If for example you want to show a text on the screen you can do that here too
    if (flagValueDogs === true) {
      myImage.setAttribute('src', 'images/shiba.jpeg');
    } else {
      myImage.setAttribute('src', 'images/grumpy2.png');
    }

    if (flagValueButton === true) {
      myButton.onclick = function () {
        setUserName();
      }
      myButton.style.display = 'block';

    } else {
      myButton.style.display = 'none'
    }

  }


  //Which method/function should be called on
  ldclient.on('ready', render);
  ldclient.on('change', render);




  //Close client
  ldclient.close();

}

//Run main() 
main();
