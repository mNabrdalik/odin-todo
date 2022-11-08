export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export function arrToLocal(arr){
    console.log(arr);
    let varChanged = "notes";
    if(arr[0] == "inbox") {
        varChanged = "projects";
    }

    if(arr[0].hasOwnProperty('isDone')) {
        varChanged = "tasks"
    }

    let jsonArr = JSON.stringify(arr);

    // const varToString = varObj => Object.keys(varObj)[0];
    // let varChanged = varToString({arr});
    console.log(varChanged);
    
    localStorage.setItem(varChanged, jsonArr);
}

export default {storageAvailable, arrToLocal};