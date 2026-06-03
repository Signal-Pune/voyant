document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL ACTION ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- TELEMETRY SIMULATION ---
  const oeeVal = document.getElementById('oee-val');
  const spindleVal = document.getElementById('spindle-val');
  const tempVal = document.getElementById('temp-val');
  const vibrationVal = document.getElementById('vibration-val');

  const oeeFill = document.getElementById('oee-fill');
  const spindleFill = document.getElementById('spindle-fill');
  const tempFill = document.getElementById('temp-fill');
  const vibrationFill = document.getElementById('vibration-fill');

  let telemetryIntervalSpeed = 1000; // default 1s simulation updates
  let telemetryTimer = null;

  // Initial target values matching raw requirements
  let oee = 94.1;
  let spindle = 1418;
  let temp = 62.7;
  let vibration = 0.13;
  let vibrationStatus = 'Active';

  function updateTelemetryValues() {
    // Slight random walk simulation
    oee = Math.max(92.0, Math.min(96.0, oee + (Math.random() - 0.5) * 0.2));
    
    // Spindle RPM depends on status (Active vs standby)
    if (vibrationStatus === 'Active') {
      spindle = Math.max(1380, Math.min(1450, spindle + Math.round((Math.random() - 0.5) * 15)));
      vibration = Math.max(0.10, Math.min(0.20, vibration + (Math.random() - 0.5) * 0.02));
    } else {
      // Standby state
      spindle = Math.max(0, spindle - 150);
      vibration = Math.max(0.01, vibration - 0.03);
    }
    
    temp = Math.max(58.0, Math.min(65.0, temp + (Math.random() - 0.5) * 0.3));

    // Update text
    oeeVal.innerHTML = `${oee.toFixed(1)}<span class="metric-unit">%</span>`;
    spindleVal.innerHTML = `${spindle.toLocaleString()}<span class="metric-unit"> RPM</span>`;
    tempVal.innerHTML = `${temp.toFixed(1)}<span class="metric-unit"> deg C</span>`;
    vibrationVal.innerHTML = `${vibration.toFixed(2)}<span class="metric-unit"> g</span>`;

    // Update visual bars
    oeeFill.style.width = `${(oee - 85) * 6.6}%`; // scale between 85% and 100%
    spindleFill.style.width = `${(spindle / 1600) * 100}%`;
    tempFill.style.width = `${((temp - 50) / 20) * 100}%`; // scale 50C - 70C
    vibrationFill.style.width = `${(vibration / 0.3) * 100}%`;
  }

  function startTelemetry() {
    if (telemetryTimer) clearInterval(telemetryTimer);
    telemetryTimer = setInterval(updateTelemetryValues, telemetryIntervalSpeed);
  }

  // --- LOG CONSOLE STREAM ---
  const logConsole = document.getElementById('log-console');
  const maxLogs = 50;

  function generateHash(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function appendLog(type, message) {
    const line = document.createElement('div');
    line.className = `console-line ${type === 'SYSTEM' ? 'console-system' : 'console-data'}`;
    
    const timestamp = new Date().toLocaleTimeString();
    line.textContent = `[${timestamp}] [${type}] ${message}`;
    
    // Remove cursor if any, append new line, and put cursor at the end
    const oldCursor = document.querySelector('.console-cursor');
    if (oldCursor) oldCursor.remove();

    logConsole.appendChild(line);

    const newCursor = document.createElement('span');
    newCursor.className = 'console-cursor';
    logConsole.appendChild(newCursor);

    // Keep scrolled down
    logConsole.scrollTop = logConsole.scrollHeight;

    // Prune old logs
    while (logConsole.childElementCount > maxLogs * 2) {
      logConsole.removeChild(logConsole.firstChild);
    }
  }

  // Initial sequential boot sequence matching prompt logs
  setTimeout(() => appendLog('SYSTEM', 'Starting edge gateway.'), 200);
  setTimeout(() => appendLog('SYSTEM', 'Local Modbus PLC connected.'), 800);
  setTimeout(() => appendLog('DATA', 'Sample received: spindle=1418rpm temp=62.7C vib=0.13g'), 1500);
  setTimeout(() => appendLog('DATA', 'Dashboard updated from Node-04.'), 2500);
  setTimeout(() => appendLog('DATA', 'Trend buffer written locally.'), 3500);

  // Periodic random log generation
  const systemLogs = [
    'Checking PLC register offsets.',
    'Sync status: OK.',
    'MQTT buffer flushed.',
    'Thermal channel normal.',
    'Telemetry packet accepted.',
    'Modbus RTU link checked.'
  ];

  function runLoggingCycle() {
    const isData = Math.random() > 0.4;
    if (isData) {
      appendLog('DATA', `Node-04 sample stored. batch=${generateHash(5)}`);
    } else {
      const msg = systemLogs[Math.floor(Math.random() * systemLogs.length)];
      appendLog('SYSTEM', msg);
    }
    
    // Schedule next log
    const nextLogDelay = Math.random() * 3000 + 1500; // 1.5s to 4.5s
    setTimeout(runLoggingCycle, nextLogDelay);
  }

  setTimeout(runLoggingCycle, 5000);

  // --- DYNAMIC CONFIG EDITOR ---
  const configVibration = document.getElementById('json-config-vibration');
  const configThermal = document.getElementById('json-config-thermal');
  const configSync = document.getElementById('json-config-sync');
  const configRate = document.getElementById('json-config-rate');

  const toggleSync = document.getElementById('toggle-sync');
  const toggleVibration = document.getElementById('toggle-vibration');
  const rateBtns = document.querySelectorAll('.config-selector-btn');

  function updateConfigUI(key, value) {
    if (key === 'cloudSync') {
      configSync.textContent = value ? 'true' : 'false';
      configSync.className = 'json-boolean';
    } else if (key === 'vibration') {
      configVibration.textContent = `"${value}"`;
      configVibration.className = 'json-string';
    } else if (key === 'samplingRate') {
      configRate.textContent = `"${value}"`;
      configRate.className = 'json-string';
    }
  }

  // Bind cloudSync toggle
  toggleSync.addEventListener('change', (e) => {
    const isSynced = e.target.checked;
    updateConfigUI('cloudSync', isSynced);
    appendLog('SYSTEM', `Cloud synchronization state updated to: ${isSynced ? 'ENABLED' : 'DISABLED'}`);
  });

  // Bind vibration toggle
  toggleVibration.addEventListener('change', (e) => {
    const isActive = e.target.checked;
    vibrationStatus = isActive ? 'Active' : 'Standby';
    updateConfigUI('vibration', vibrationStatus);
    
    // Update local config display and node details
    const thermalText = isActive ? 'Normal (62.4 C)' : 'Standby (41.1 C)';
    configThermal.textContent = `"${thermalText}"`;
    
    appendLog('SYSTEM', `Sensor vibration node state updated: ${vibrationStatus}`);
    appendLog('SYSTEM', `Thermal profile adjusted to: ${thermalText}`);
  });

  // Bind samplingRate selector buttons
  rateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const rate = btn.getAttribute('data-rate');
      updateConfigUI('samplingRate', rate);
      
      // Map sampling rate to actual telemetry update timer interval
      if (rate === '250ms') {
        telemetryIntervalSpeed = 250;
      } else if (rate === '500ms') {
        telemetryIntervalSpeed = 500;
      } else {
        telemetryIntervalSpeed = 1000;
      }
      
      startTelemetry();
      appendLog('SYSTEM', `Gateway sampling rate set to ${rate}`);
    });
  });

  // Initial runs
  startTelemetry();
});
