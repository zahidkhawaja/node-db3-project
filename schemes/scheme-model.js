const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where("id", id);
}

function findSteps(id) {
    return db("steps")
    .select("steps.*", "schemes.scheme_name")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .where("scheme_id", id)
    .orderBy("steps.step_number");
}

function add(scheme) {
    return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => findById(id))
}

function update(changes, id) {
    return db("schemes")
    .where("id", id).update(changes)
    .then(() => findById(id));
}

function remove(id) {
    return db("schemes").where("id", id).del();
}


