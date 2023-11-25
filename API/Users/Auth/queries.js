const checkEmailExists = 'SELECT s FROM "Users_schema"."Users" s WHERE s.usr_email = $1';
const validateUser = 'SELECT usr_id FROM "Users_schema"."Users" s WHERE s.usr_email = $1 AND s.usr_pass = $2';
const checkAdminEmailExists = 'SELECT s FROM "Users_schema"."admins" s WHERE s.adm_email = $1';

module.exports = {
    checkEmailExists,
    validateUser,
    checkAdminEmailExists
};