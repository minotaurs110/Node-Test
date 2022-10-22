
// ****************************************** Task 2 ***************************************************

const counter = (initial = 0) => {
    let state = initial;

    const getCurrentValue = () => {
        console.log('state', state)
    }

    const increaseByOne = () => {
        state++;
    }

    return [getCurrentValue, increaseByOne]
}

// const [getA, nextA] = counter(1); 
// getA(); // 1 
// nextA(); 
// getA(); // 2 
// const [getB, nextB] = counter(10); 
// nextB(); 
// getA(); // 2 
// getB(); // 11 
// nextA(); 
// getA(); // 3 
// getB(); // 11

