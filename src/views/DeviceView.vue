<script>
export default {
  methods: {
    toggle(device) {
      device.isActive = !device.isActive;
    },
  },
  data() {
    return {
        devices: [
            {id: 1, name: 'DeviceName 1', status: 'DeviceStatus', isActive: false },
            {id: 2, name: 'DeviceName 2', status: 'DeviceStatus', isActive: false },
            {id: 3, name: 'DeviceName 3', status: 'DeviceStatus', isActive: false },
            {id: 4, name: 'DeviceName 4', status: 'DeviceStatus', isActive: false },
            {id: 5, name: 'DeviceName 5', status: 'DeviceStatus', isActive: false }
        ],
    };
  },
};
</script>

<template>
    <div class="devices-container">
        <div class="device" v-for="device in devices" :key="device.id">
            <div class="device-content">
                <h3>{{ device.name }}</h3>
                <p>Status: {{ device.status }}</p>
            </div>
            <button class="on-off-button" :class="[device.isActive ? 'green' : 'red']" @click="toggle(device)">{{ device.isActive ? 'ON' : 'OFF' }}</button>
        </div>
    </div>
</template>

<style scoped>
.devices-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.device {
    width: 600px;
    height: 125px;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.device-content {
    display: inline-block;
}

.on-off-button {
    border: none;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: #4CAF50;
    color: white;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    outline: none;
}

.green {
    background-color: #45a049;
}

.red {
    background-color: #c41f1f;
}

.details {
    margin-top: 1rem;
}
</style>