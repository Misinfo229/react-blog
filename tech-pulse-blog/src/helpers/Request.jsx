export const Request = async (url, method, dataSave = "", files = false) => {

    let loading = true;

    let options = {
        method: "GET"
    }
    if (method == "GET" || method == "DELETE") {
        options = {
            method: method,
        };
    }
    if (method == "POST" || method == "PUT") {
        if (files) {
            options = {
                method: method,
                body: dataSave // FormData
                // NO incluir headers, fetch los gestiona automáticamente para FormData
            };
        } else {
            options = {
                method: method,
                body: JSON.stringify(dataSave),
                headers: {
                    "Content-Type": "application/json"
                }
            };
        }
    }
    try {
        const response = await fetch(url, options);

        // Intenta parsear como JSON
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const info = await response.json();
            loading = false;
            return { info, loading };
        } else {
            const text = await response.text();
            throw new Error("The answer is not JSON. Content received:\n" + text);
        }

    } catch (error) {
        console.error("Error in Request.jsx:", error.message);
        return {
            info: {
                status: "error",
                message: error.message
            },
            loading: false
        };
    }
};