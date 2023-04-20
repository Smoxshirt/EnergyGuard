<script setup>
    function onButtonClick(click) {
        //toggle button state on click between on/off
        buttonClickEvent();
    }


</script>

<template>
    <div>
        <div class="device">
            <div class="device-content">
                <h3>DeviceName 1</h3>
                <p>Status: DeviceStatus</p>
            </div>
            <button onClick={onButtonClick} class="on-off-button">On/Off</button>
        </div>
    </div>
</template>

<style scoped>
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

.on-off-button:hover {
    background-color: #45a049;
}

.on-off-button:active {
    background-color: #c41f1f;
}

.details {
    margin-top: 1rem;
}
</style>