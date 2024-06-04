const connection = require('../db/connect')

const login = async (req, res) => {

    const { email, password } = req.query;
    if (email && password) {

        let query = `SELECT  u.u_id, u.f_name, u.l_name, u.mobile, u.email, u.address1, u.address2, u.country, u.state_region, u.profile_pic FROM user_profile u WHERE u.email = '${email}' AND u.password = '${password}'`
        connection.query(query, ((err, result) => {
            if (err) {
                res.status(500).json(
                    { 
                      isError: true, 
                      massage: err.message 
                    }
                );
            } else {

                if(result.length == 0){
                    res.status(401).json(
                        { 
                           isError: true, 
                           massage: "Incorrect Email & Password" 
                         }
                     );
                }else{
                    res.status(200).json(
                        { 
                           isError: true, 
                           massage: result 
                         }
                     );
                }

                
            }
        }));

    }else{
        res.status(401).json(
            { 
              isError: true, 
              massage: "Provide Email and Password" 
            }
        );
    }
       
}

const signup = async (req, res) => {

    const {f_name, l_name, email, password} = req.body;

    if(f_name && l_name && email && password){

        let query = `INSERT INTO user_profile (f_name, l_name, email, password) VALUES ('${f_name}', '${l_name}', '${email}', '${password}');`
        connection.query(query, ((err, result) => {
            if (err) {
                res.status(500).json(
                    { 
                      isError: true, 
                      massage: err.message 
                    }
                );
            } else {
                res.status(200).json(
                    { 
                      isError: false, 
                      massage: "Signup Successfully" 
                    }
                );
            }
        }));

    }else{
        res.status(401).json(
            { 
              isError: true, 
              massage: "Signup data is missing" 
            }
        );
    }
    
}

module.exports = {
    login,
    signup
}