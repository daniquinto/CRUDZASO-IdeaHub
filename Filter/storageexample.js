export function getFromStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function initializeSampleData() {
    const ideas = getFromStorage('crudzaso_ideahub_ideas');
    const users = getFromStorage('crudzaso_ideahub_users');

export function initializeSampleData() {
    console.log("Initializing sample data...");
    const ideas = getFromStorage('crudzaso_ideahub_ideas');
    const users = getFromStorage("crudzaso_ideahub_users");

    if (ideas.length == 0) {
        console.log("No ideas found, creating sample data");
        const ideas = [
            {
                id: 1,
                title: "Mobile delivery app",
                description: "create an app to order food from mobile phone",
                category: "product",
                authorId: 1,
                createdAt: "2024-01-20T10:30:00Z"
            },
            {
                id: 2,
                title: "Feedback system",
                description: "employees can give their opinions",
                category: "improvement",
                authorId: 2,
                createdAt: "2024-01-19T14:15:00Z"
            },
            {
                id: 3,
                title: "Customer service bot",
                description: "a robot that answers basic questions",
                category: "experiment",
                authorId: 1,
                createdAt: "2024-01-18T09:45:00Z"
            }
        ];
        
        const users = [
            {id:1, name: 'Tomi cat', email: 'tomicat@gmail.com'},
            {id:2, name: 'Alan Brito', email: 'alanbrito@gmail.com'}
        ];
        saveToStorage('crudzaso_ideahub_ideas', ideas);
        saveToStorage("crudzaso_ideahub_users", users);
        console.log("Data saved!");
    } else {
        console.log("Data already exists");
    }
}