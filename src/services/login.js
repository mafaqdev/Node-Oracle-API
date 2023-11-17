var oracledb = require('oracledb');
oracledb.autoCommit = true;

const loginUser = async (email, password) => {
  const result = await ifUserExists(email);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    if (password === user.USER_PASSWORD) {
      return { ...user };
    }
  }
  return false;
};

const ifUserExists = async (email) => {
    const connection = await oracledb.getConnection({
      user: "chklist", 
      password: "Iphone10", 
      connectString: "172.16.3.250:1521/emrep"
    });
    const result = await connection.execute(`SELECT USER_ID, USER_NAME, USER_PASSWORD, USER_FULL_NAME, ACTIVE from CAFE.USER_INFO WHERE USER_NAME = '${email}'`,{}, { outFormat: oracledb.OBJECT });
    return result;
};

module.exports = { loginUser };