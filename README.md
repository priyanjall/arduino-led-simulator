# Minimal Arduino Web Simulator – LED Control using Push Button

This project is a minimal web-based Arduino simulator developed for the  
**FOSSEE OSHW Semester Long Internship – 2025 Screening Task**.

The simulator demonstrates automatic component wiring, configurable pin assignment,
automatic Arduino code generation, and logic-level firmware simulation of an LED
controlled by a push button using an Arduino Uno.

---

## Objective

To build a minimal functional prototype that demonstrates:

- Web-based electronics tool development
- Embedded systems fundamentals
- Software-driven hardware simulation
- Automatic Arduino code generation
- Continuous firmware loop behavior

---

## Features Implemented

### Task 1 — Web Interface & Component Handling
- Component palette:
  - Arduino Uno
  - LED
  - Push Button
- Workspace canvas for circuit visualization
- Start / Stop simulation controls
- Code View toggle (code visible without hiding circuit)
- Minimal UI focused on correctness over design

---

### Task 2 — Auto Wiring & Configurable Pins
- Default automatic wiring:
  - LED → D10
  - Push Button → D2
- User-configurable digital pins (D2–D13)
- Pin conflict prevention:
  - LED and Button cannot share same pin
- Wiring updates dynamically when pin changes

---

### Task 3 — Code Generation & Logic Simulation
- Automatic Arduino code generation:
  - `pinMode()`
  - `digitalRead()`
  - `digitalWrite()`
- Code updates instantly when pins change
- Continuous firmware loop simulation

#### Logic Behaviour

| Button | GPIO | LED |
|------|----|----|
| Pressed | HIGH | ON |
| Released | LOW | OFF |

---

## Simulation Behaviour

- Button works **only when simulation is running**
- STOP fully resets the microcontroller state
- LED visually glows when HIGH
- Simulation runs continuously like Arduino `loop()`

---

## Simulation Workflow

1. Add Arduino Uno
2. Add LED (auto-wired D10)
3. Add Push Button (auto-wired D2)
4. View generated Arduino code
5. Change pin assignments if needed
6. Press START
7. Hold button → LED ON
8. Release button → LED OFF
9. Press STOP → system reset

---

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla)

---

## How to Run

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Add components and run the simulation

No installation required.

---

## Notes

- This is a logic-level simulator only
- No actual hardware communication
- Designed to demonstrate understanding of embedded firmware behaviour

---

## Author

Priyanjal Yadav  
FOSSEE OSHW Semester Long Internship – 2025  
Screening Task Submission

--

## Design Scope & Decisions

This project intentionally implements a minimal functional simulator focused on
correct firmware behaviour rather than full circuit CAD simulation.

- Drag-and-drop wiring is not implemented to keep the prototype lightweight and focused on logic simulation.
- The simulator does not depend on external component libraries; components are modeled programmatically.
- The microcontroller is simulated at the logic (GPIO) level instead of cycle-accurate emulation.

The goal of the project is to demonstrate understanding of Arduino execution flow
(`setup()` + continuous `loop()`), GPIO state handling, and automatic code generation,
rather than building a full hardware emulator.
