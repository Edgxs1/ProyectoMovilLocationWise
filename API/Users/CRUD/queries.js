const getAllUsers = 'SELECT t.* FROM "Users_schema"."Users" t';
const getUserByID = 'SELECT t.* FROM "Users_schema"."Users" t WHERE t.usr_id = $1';
const checkEmailExists = 'SELECT s FROM "Users_schema"."Users" s WHERE s.usr_email = $1';
const addUser = 'INSERT INTO "Users_schema"."Users" (usr_username, usr_email, usr_pass) VALUES ($1, $2, $3)';
const updateUserByID = 'UPDATE "Users_schema"."Users" t SET usr_username = $1, usr_email = $2, usr_pass = $3 WHERE t.usr_id = $4';
const deleteUserByID = 'DELETE FROM "Users_schema"."Users" t WHERE t.usr_id = $1';
const deleteUserByEmail = 'DELETE FROM "Users_schema"."Users" t WHERE t.usr_email = $1';
const addAdmin = ' INSERT INTO "Users_schema"."admins" (adm_email) VALUES ($1)';

module.exports = {
    getAllUsers,
    getUserByID,
    checkEmailExists,
    addUser,
    updateUserByID,
    deleteUserByID,
    deleteUserByEmail,
    addAdmin
};