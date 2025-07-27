function showSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "flex";
}

function hideSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "none";
}

// Navbar Scroll Behavior
const navbar = document.getElementById("nav");
const signup = document.getElementById("signup");
const logo = document.getElementById("logo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "rgba(71, 65, 166, 0.9)";
    navbar.classList.remove("bg-transparent");
    navbar.style.justifyContent = "center";
    signup.style.display = "none";
    logo.style.display = "none";
    navbar.classList.add("backdrop-blur-md", "z-40");
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.classList.add("bg-transparent");
    signup.style.display = "block";
    logo.style.display = "block";
    navbar.style.justifyContent = "space-between";
    navbar.classList.remove("backdrop-blur-md", "z-40");
  }
});

// For Destinations page

let destinationData = [];

async function loadDestinationData() {
  try {
    const response = await fetch("destinations.json");
    if (!response.ok) {
      throw new Error("Failed to load JSON data");
    }

    destinationData = await response.json();
    renderDestinations(destinationData); // Call a function to update DOM
  } catch (error) {
    console.error("Error loading destination data:", error);
  }
}

//BOOKINGS PAGE

function renderDestinations(data) {
  const bodyId = document.body.id;

  if (bodyId === "destinations") {
    const destinationGrid = document.getElementById("destGrid");
    const buttonContainer = document.getElementById("buttonContainer");

    buttonContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") {
        const clickedButton = e.target;
        const text = clickedButton.textContent.trim();

        document.querySelectorAll(".destination").forEach((div) => {
          div.style.display = div.classList.contains(text) ? "block" : "none";
        });

        console.log("Button Text:", text);
      }
    });

    data.forEach((location) => {
      const {
        id,
        destination,
        country,
        continent,
        description,
        main_image: mainImage,
        pricing,
      } = location;

      const div = document.createElement("div");
      div.classList.add(continent, "destination", "All");

      const destContent = `
      <div class="border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img
            class="rounded-t-lg h-50 w-full object-cover hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            src="${mainImage}"
            alt="${destination}"
          />
        </div>
        <div class="p-2">
          <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            ${destination}
          </h5>
          <p class="text-sm">${country}</p>
          <div class="flex justify-between content-center">
            <div>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                From <span class="font-bold">$${pricing}</span>
              </p>
              <p class="text-xs text-gray-700">
                <i class="fa-solid fa-star" style="color: #ffc83e"></i>
                <i class="fa-solid fa-star" style="color: #ffc83e"></i>
                <i class="fa-solid fa-star" style="color: #ffc83e"></i>
                <i class="fa-solid fa-star" style="color: #ffc83e"></i>
                <i class="fa-solid fa-star-half-stroke" style="color: #ffc83e"></i>
              </p>
            </div>
            <a
              href="bookings.html?id=${id}"
              class="inline-flex items-center px-2 text-sm font-medium text-center text-white bg-[#4741A6] rounded-lg hover:bg-[#2C3E50] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${id}"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>`;

      div.innerHTML = destContent;
      destinationGrid.appendChild(div);
    });
  } else if (bodyId === "bookings") {
    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get("id");

    data.forEach((booking) => {
      const {
        id,
        destination,
        country,
        continent,
        description,
        main_image: mainImage,
        images,
        pricing,
      } = booking;

      if (id === destinationId) {
        const bookingDiv = document.getElementById("bookingDiv");
        const defaultBooking = document.getElementById("defaultBooking");
        defaultBooking.classList.add("hidden");

        const div = document.createElement("div");
        div.classList.add(continent, "destination", "All");
        const choiceContent = `<div
      class="flex flex-col md:flex-row p-3 md:px-20 lg:px-30 xl:px-40 gap-5 md:gap-5 xl:gap-10 text-[#4741A6] justify-center -z-1" 
    >
      <div
        class="border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-full sm:2-lg md:w-xl"
      >
        <a href="#">
          <img
            class="rounded-t-lg h-4/5 w-full object-cover hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            src="${mainImage}"
            alt=""
          />
        </a>
        <div class="p-2">
          <a href="#">
            <h5
              class="mb-1 font-bold tracking-tight text-2xl md:text-3xl lg:text-4xl"
            >
              ${destination}
            </h5>
            <p class="text-md md:text-lg lg:text-xl">${country}</p>
            <p class="text-md md:text-lg lg:text-xl italic mt-2 md:mt-4 lg:mt-5">${description}</p>
          </a>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl sm:2-lg md:w-xl">
        <div class="">
        <p class="text-md md:text-lg lg:text-xl mb-2">Name</p>
        <input class="border p-1 rounded-lg w-full mb-2" type="text" placeholder="Enter Your Name" id="traveller" />
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <p class="text-md md:text-lg lg:text-xl">Travel date</p>
              <input class="border p-1 rounded-lg" type="date" id="startDate" />
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-md md:text-lg lg:text-xl">Return Date</p>
              <input class="border p-1 rounded-lg" type="date" id="endDate" />
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-md md:text-lg lg:text-xl">Adults</p>
              <select class="border p-2 rounded-lg" name="Select Number" id="selectOne">
                <option value="">Select Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-md md:text-lg lg:text-xl">Children</p>
              <select class="border p-2 rounded-lg" name="Select Number" id="selectTwo">
                <option value="">Select Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <p
            class="font-bold text-md md:text-lg lg:text-xl mt-3 md:mt-4 lg:mt-5"
          >
            Included
          </p>
          <div class="grid grid-cols-2 gap-5 mt-3 md:mt-4 lg:mt-5">
            <p class="text-md md:text-lg lg:text-xl">
              <i class="fa-solid fa-hotel fa-lg" style="color: #4741a6"></i>
              Hotel
            </p>
            <p class="text-md md:text-lg lg:text-xl">
              <i
                class="fa-solid fa-person-hiking fa-lg"
                style="color: #4741a6"
              ></i>
              Hiking
            </p>
            <p class="text-md md:text-lg lg:text-xl">
              <i
                class="fa-solid fa-plane fa-rotate-by fa-lg"
                style="color: #4741a6; --fa-rotate-angle: 295deg"
              ></i
              >Flight
            </p>
            <p class="text-md md:text-lg lg:text-xl">
              <i
                class="fa-solid fa-torii-gate fa-lg"
                style="color: #4741a6"
              ></i>
              City Tour
            </p>
          </div>

          <hr class="mb-5 border-t border-[#4741A6] mt-3 md:mt-4 lg:mt-5" />

          <div
            class="flex justify-between font-bold text-lg md:text-xl lg:text-2xl mt-5 md:mt-7 lg:mt-9"
          >
            <p class="">Price:</p>
            <p>$ ${pricing}</p>
          </div>

          <button id="bookingComfirmation"
            class="w-full mt-[30px] py-[10px] bg-[#4741A6] text-white outline-none text-[18px] rounded-[4px] cursor-pointer shadow-lg mt-5 md:mt-7 lg:mt-9"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex justify-center content-center my-5 md:my-10 xl:my-15 px-2 md:px-10 lg:px-20"
    >
      <div
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 w-full md:w-full lg:w-[800px]"
      >
        <img
          class="rounded-lg lg:row-span-2 lg:col-span-2 object-cover hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${images[0]}"
          alt=""
        />
        <img
          class="rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${images[1]}"
          alt=""
        />
        <img
          class="rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${images[2]}"
          alt=""
        />
        <img
          class="rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${images[3]}"
          alt=""
        />
        <img
          class="rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${images[4]}"
          alt=""
        />
        <img
          class="rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          src="${mainImage}"
          alt=""
        />
      </div>
    </div>`;
        div.innerHTML = choiceContent;
        bookingDiv.appendChild(div);

        const bookingSection = document.getElementById("bookingSection");
        const bookingPopUp = document.getElementById("bookingPopUp");
        const bookingConfirm = document.getElementById("bookingComfirmation");
        bookingConfirm.addEventListener("click", function () {
          const travellersName = document.getElementById("traveller").value;
          const randomNumber = Math.floor(
            1000000000 + Math.random() * 9000000000
          );

          const start = document.getElementById("startDate").value;
          const end = document.getElementById("endDate").value;
          const start1 = new Date(start);
          const end1 = new Date(end);

          const timeDiff = end1.getTime() - start1.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          const val1 = document.getElementById("selectOne").value;
          const val2 = document.getElementById("selectTwo").value;

          const num1 = val1 ? parseInt(val1) : 0;
          const num2 = val2 ? parseInt(val2) : 0;

          const noOfGuest = num1 + num2;

          const taxes = 100;

          const total = pricing * (noOfGuest + 1) * daysDiff + taxes;
          const content = `
<div class="flex flex-col justify-center items-center">
          <img
            class="w-[100px] mt-[-50px] rounded-[50%] shadow-lg"
            src="Assets/Home-page/Gallery1/404-tick.png"
            alt=""
          />
          <h2 class="text-[38px] font-medium mt-[5px] mb-[2px]">
            See you Soon ${travellersName}
          </h2>
          <p>Your reservation to ${destination} has been Confirmed</p>
          <p class="font-bold">ID: # ${randomNumber}</p>
        </div>
        <hr class="my-2 border-t border-gray-300 w-full" />
        <div class="flex flex-col gap-2">
          <p class="font-bold">
            Name: <span class="font-normal">${travellersName}</span>
          </p>
          <p class="font-bold">
            Destination: <span class="font-normal">${destination}</span>
          </p>
          <p class="font-bold">
            From: <span class="font-normal">${start}</span>
          </p>
          <p class="font-bold">
            To: <span class="font-normal">${end}</span>
          </p>
          <hr class="border-t border-gray-300 w-full" />
          <p class="font-bold">
            Rate per Night: <span class="font-normal">$${pricing}</span>
          </p>
                    <p class="text-xs italic">
            No of Nights: <span class="font-normal">${daysDiff}</span>
          </p>
          <p class="font-bold">Guest: <span class="font-normal">${noOfGuest}</span></p>

          <p class="font-bold">Taxes: <span class="font-normal">$100</span></p>
          <hr class="my-2 border-t border-gray-300 w-full" />
          <p class="font-bold text-2xl">Total: $ ${total}</p>
        </div>
        <button
          class="w-full mt-[30px] py-[10px] bg-[#6fd649] text-white outline-none text-[18px] rounded-[4px] cursor-pointer shadow-lg"
          id="closeBookingPopUp"
          type="button"
        >
          OK
        </button>`;

          bookingPopUp.innerHTML = content;

          bookingPopUp.classList.remove("hidden", "top-[1%]", "scale-[0.1]");
          bookingPopUp.classList.add("top-[50%]", "scale-[1]");
          bookingSection.classList.add("blur-xl", "pointer-events-none");

          const closeBookingPopUp =
            document.getElementById("closeBookingPopUp");

          closeBookingPopUp.addEventListener("click", function () {
            bookingPopUp.classList.remove("top-[50%]", "scale-[1]");
            bookingPopUp.classList.add("top-[1%]", "scale-[0.1]");
            bookingSection.classList.remove("blur-xl", "pointer-events-none");

            setTimeout(() => {
              bookingPopUp.classList.add("hidden");
            }, 300);
          });
        });
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", loadDestinationData);

// Travel Planner Form Validation
const form = document.getElementById("myForm");

const trip = document.getElementById("tripName");
const date = document.getElementById("date");
const Destination = document.getElementById("destination");
const Flight = document.getElementById("flight");
const Continent = document.getElementById("continent");
const hotel = document.getElementById("hotel");
const TransportMeans = document.getElementById("transportMeans");
const Transport = document.getElementById("transport");
const Schedule = document.getElementById("schedule");
const Budget = document.getElementById("budget");
const Note = document.getElementById("note");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateInputs()) {
    openPopup();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  errorDisplay.style.color = "red";
  inputControl.classList.add("border-red-400");
  inputControl.classList.remove("border-green-400");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("border-red-400");
  inputControl.classList.add("border-green-400");
};

const validateInputs = () => {
  let isValid = true;

  const tripVal = trip.value.trim();
  const dateVal = date.value.trim();
  const DestinationVal = Destination.value.trim();
  const FlightVal = Flight.value.trim();

  if (tripVal === "") {
    setError(trip, "Trip name is required");
    isValid = false;
  } else {
    setSuccess(trip);
  }

  if (dateVal === "") {
    setError(date, "Date is required");
    isValid = false;
  } else {
    setSuccess(date);
  }

  if (DestinationVal === "") {
    setError(Destination, "Destination is required");
    isValid = false;
  } else {
    setSuccess(Destination);
  }

  if (FlightVal === "") {
    setError(Flight, "Flight is required");
    isValid = false;
  } else {
    setSuccess(Flight);
  }

  return isValid;
};

// Popup
const popUp = document.getElementById("popUp");
const ScheduleDiv = document.getElementById("scheduleDiv");

function openPopup() {
  const content = `
    <div class="flex flex-col justify-center items-center">
      <img class="w-[100px] mt-[-50px] rounded-[50%] shadow-lg"
           src="Assets/Home-page/Gallery1/404-tick.png" alt="" />
      <h2 class="text-[38px] font-medium mt-[5px] mb-[2px]">Congratulations</h2>
      <p>Your Trip to ${Destination.value} has been Confirmed</p>
    </div>
    <hr class="my-2 border-t border-gray-300 w-full" />
    <div class="flex flex-col gap-2">
      <p class="font-bold">Trip name: <span class="font-normal">${trip.value}</span></p>
      <p class="font-bold">Destination: <span class="font-normal">${Destination.value} on ${date.value}</span></p>
      <hr class="border-t border-gray-300 w-full" />
      <p class="font-bold">Flight: <span class="font-normal">${Flight.value}</span></p>
      <p class="font-bold">Hotels: <span class="font-normal">${hotel.value} in ${Continent.value}</span></p>
      <p class="font-bold">Transportation: <span class="font-normal">${Transport.value} by ${TransportMeans.value}</span></p>
      <p class="font-bold">Daily Schedule: <span class="font-normal">${Schedule.value}</span></p>
      <p class="font-bold">Budget: <span class="font-normal">$${Budget.value}</span></p>
      <p class="font-bold">Travel Notes: <span class="font-normal">${Note.value}</span></p>
    </div>
    <button class="w-full mt-[30px] py-[10px] bg-[#6fd649] text-white outline-none text-[18px] rounded-[4px] cursor-pointer shadow-lg"
            onclick="ClosePopUp()" type="button">
      OK
    </button>`;

  popUp.innerHTML = content;

  popUp.classList.remove("hidden", "top-[1%]", "scale-[0.1]");
  popUp.classList.add("top-[50%]", "scale-[1]");
  ScheduleDiv.classList.add("blur-xl", "pointer-events-none");
}

function ClosePopUp() {
  popUp.classList.remove("top-[50%]", "scale-[1]");
  popUp.classList.add("top-[1%]", "scale-[0.1]");
  ScheduleDiv.classList.remove("blur-xl", "pointer-events-none");

  setTimeout(() => {
    popUp.classList.add("hidden");
  }, 300);
  form.reset();
}
