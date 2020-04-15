const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    findSteps
    // add,
    // update,
    // remove
}

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where("id", id);
}

function findSteps(id) {
    return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("steps.*", "schemes.scheme_name")
    .where("scheme_id", id);
}