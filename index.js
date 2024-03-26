// Getting User Name And Removing Start Screen
document.querySelector(".control-buttons span").onclick = function () {
    let person = prompt("Please Enter Your Name");

    if (person === null || person === "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = person;
    }

    document.querySelector(".control-buttons").remove();

    blocks.forEach((block) => {
        block.classList.add("is-flipped");
    })

    setTimeout(() => {
        blocks.forEach((block) => {
            block.classList.remove("is-flipped");
        })
    }, 2000)
}

// Variables
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let duration = 1000;
// Getting an array of blocks length in the game
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Reordering with the shuffled numbers
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        flipBack(block)
    })
})

function flipBack(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let flippedBlocks = blocks.filter((block) => block.classList.contains("is-flipped"));
    if (flippedBlocks.length === 2) {
        stopClicking();
        checkForMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

function checkForMatchedBlocks(firstBox, secondBox) {
    let triesElement = document.querySelector('.tries span');
    if (firstBox.dataset.technology === secondBox.dataset.technology) {
        firstBox.classList.remove("is-flipped");
        secondBox.classList.remove("is-flipped");

        firstBox.classList.add("has-matched");
        secondBox.classList.add("has-matched");
        checkIfYouWon()
        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBox.classList.remove("is-flipped");
            secondBox.classList.remove("is-flipped");
        }, duration)
        document.getElementById("fail").play();
    }
}

function shuffle(array) {
    let curr = array.length,
        temp,
        random;
    while (curr > 0) {
        random = Math.floor(Math.random() * curr);
        curr--
        temp = array[curr];
        array[curr] = array[random];
        array[random] = temp;
    }
    return array
}

function checkIfYouWon() {
    let testing = blocks.every((card) => card.classList.contains("has-matched")
    );
    if (testing) {
        document.getElementById("winner-popup").style.display = "block";
        document.getElementById("victory").play();
    }
}

let cancelBtn = document.getElementById("cancel").onclick = function () {
    document.getElementById("winner-popup").style.display = "none";
}

let startNewGame = document.getElementById("new-game").onclick = function () {
    blocks.forEach(block => {
        block.classList.remove("has-matched");
    })
    document.getElementById("winner-popup").style.display = "none";
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
    })
}