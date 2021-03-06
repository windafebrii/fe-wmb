import Swal from "sweetalert2";

export async function fetchDataTable(pagination){
    const data = await fetch(`http://10.10.13.150:9090/tables?size=16&page=${pagination}`, {method:'GET',})
        .then((response) => {
            return response.json()
        })
    return data;
}
export async function fetchTableById(idTable){
    const data = await fetch(`http://10.10.13.150:9090/table/${idTable}`, {method:'GET',})
        .then((response) => {
            return response.json()
        })
    return data;
}
export async function saveDataTable(dataTable) {
    return await fetch('http://10.10.13.150:9090/table', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json"
        },
        body: JSON.stringify(dataTable)
    })
        .then( async (res) => {
            let respond = await res.json();
            if (res.status === 200){
                await Swal.fire(
                    'Success!',
                    'Input Data Success!',
                    'success'
                )
            }else if (respond.message ==="No message available"){
                await Swal.fire(
                    'Error!',
                    'please fill in correctly',
                    'error'
                )
            } else await Swal.fire(
                'Error!',
                'Table number already exists'+respond.message,
                'error'
            )
        }).catch();
}
export async function updateTable(dataTable) {
    return await fetch('http://10.10.13.150:9090/table', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json"
        },
        body: JSON.stringify(dataTable)
    })
        .then( async (res) => {
            let respond = await res.json();
            if (res.status === 200){
                await Swal.fire(
                    'Success!',
                    'Update Table Success!',
                    'success'
                )
            } else await Swal.fire(
                'Error!',
                'Table number already exists',
                'error'
            )
        }).catch();
}

export async function deleteTable(idTable) {
    const data = await fetch(`http://10.10.13.150:9090/table/${idTable}`, {
        method: 'DELETE'
    })
        .then(async (res) => {
            let respond = await res.json();
            if (respond.status === 200) {
                await Swal.fire(
                    'Success!',
                    'Delete Success',
                    'success'
                )
            } else await Swal.fire(
                'Error!',
                'Cannot delete when table already ordered',
                'error'
            )
        }).catch(reason => reason.data)
    return data;
}