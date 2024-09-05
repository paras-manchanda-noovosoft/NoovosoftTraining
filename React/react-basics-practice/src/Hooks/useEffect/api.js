// example that there was a dummy data
const data = [{name: "alice", age: 21, jobRole: "software developer"}];

export function fetchBio(name) {
    const lowercase=name.toLowerCase();
    const t = data.filter((x) =>{
        name=name.toLowerCase();
        return x.name === lowercase;
    });
    return t;
}