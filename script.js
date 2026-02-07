const workspace = document.getElementById("workspace");
const codeBox = document.getElementById("code");
const ledSelect = document.getElementById("ledPin");
const buttonSelect = document.getElementById("buttonPin");

/* ===== Virtual Arduino Hardware ===== */
let pins = {};
for (let i = 0; i <= 13; i++) pins[i] = 0;

let hardware = {
  arduino: false,
  led: null,
  button: null
};

let running = false;
let cpuInterval = null;
let buttonPhysicalState = false;

/* ===== Components ===== */

function addArduino() {
  if (hardware.arduino) return;
  hardware.arduino = true;
  workspace.innerHTML += "<div>Arduino Uno Connected</div>";
  updateCode();
}

function addLED() {
  if (!hardware.arduino || hardware.led !== null) return;

  hardware.led = 10;
  workspace.innerHTML += "<div>LED → D10</div><div id='led' class='led'></div>";
  populatePins();
  updateCode();
}

function addButton() {
  if (!hardware.arduino || hardware.button !== null) return;

  hardware.button = 2;
  workspace.innerHTML += "<div>Push Button → D2</div><button id='btn'>PRESS</button>";
  attachButton();
  populatePins();
  updateCode();
}

/* ===== Physical Button (FIXED) ===== */

function attachButton() {
  const btn = document.getElementById("btn");

  btn.onmousedown = () => {
    if (!running) return;
    buttonPhysicalState = true;
  };

  document.onmouseup = () => {
    if (!running) return;
    buttonPhysicalState = false;
  };
}

/* ===== Arduino Firmware Loop ===== */

function firmwareLoop() {
  pins[hardware.button] = buttonPhysicalState ? 1 : 0;

  if (pins[hardware.button] === 1)
    pins[hardware.led] = 1;
  else
    pins[hardware.led] = 0;

  renderLED();
}

/* ===== LED Rendering (GLOW ADDED) ===== */

function renderLED() {
  const led = document.getElementById("led");
  if (!led) return;

  if (pins[hardware.led]) {
    led.style.background = "lime";
    led.style.boxShadow = "0 0 20px lime";
  } else {
    led.style.background = "darkred";
    led.style.boxShadow = "none";
  }
}

/* ===== Simulation Control (RESET FIXED) ===== */

function startSimulation() {
  if (!hardware.arduino || hardware.led === null || hardware.button === null) return;
  if (running) return;

  running = true;
  cpuInterval = setInterval(firmwareLoop, 40);
}

function stopSimulation() {
  running = false;
  clearInterval(cpuInterval);

  // FULL RESET
  buttonPhysicalState = false;
  for (let i = 0; i <= 13; i++) pins[i] = 0;

  renderLED();
}

/* ===== Pin Configuration ===== */

function populatePins() {
  ledSelect.innerHTML = "";
  buttonSelect.innerHTML = "";

  for (let i = 2; i <= 13; i++) {
    let l = new Option("D" + i, i);
    let b = new Option("D" + i, i);

    if (i === hardware.button) l.disabled = true;
    if (i === hardware.led) b.disabled = true;

    ledSelect.add(l);
    buttonSelect.add(b);
  }

  ledSelect.value = hardware.led;
  buttonSelect.value = hardware.button;
}

ledSelect.onchange = () => {
  hardware.led = Number(ledSelect.value);
  populatePins();
  updateCode();
};

buttonSelect.onchange = () => {
  hardware.button = Number(buttonSelect.value);
  populatePins();
  updateCode();
};

/* ===== Code Generation ===== */

function updateCode() {
  if (!hardware.arduino) {
    codeBox.textContent = "// Add Arduino to start";
    return;
  }

  codeBox.textContent =
`int ledPin = ${hardware.led ?? 10};
int buttonPin = ${hardware.button ?? 2};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH)
    digitalWrite(ledPin, HIGH);
  else
    digitalWrite(ledPin, LOW);
}`;
}

function toggleCode() {
  codeBox.classList.toggle("hidden");
}
