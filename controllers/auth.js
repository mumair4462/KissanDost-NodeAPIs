const connection = require('../db/connect')
const fs = require('fs');
const path = require('path');

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

                if (result.length == 0) {
                    res.status(200).json(
                        {
                            isError: true,
                            massage: "Incorrect Email & Password"
                        }
                    );
                } else {
                    res.status(200).json(
                        {
                            isError: true,
                            massage: result
                        }
                    );
                }


            }
        }));

    } else {
        res.status(200).json(
            {
                isError: true,
                massage: "Provide Email and Password"
            }
        );
    }

}

const signup = async (req, res) => {

    const { f_name, l_name, email, password } = req.body;

    if (f_name && l_name && email && password) {

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

    } else {
        res.status(200).json(
            {
                isError: true,
                massage: "Signup data is missing"
            }
        );
    }

}

const updateProfile = async (req, res) => {

    const { u_id, f_name, l_name, mobile, email, address1, address2, country, state_region, profile_pic, change_pic } = req.body;

    if (u_id && f_name && l_name && mobile && email && address1 && address2 && country && state_region && profile_pic && change_pic != undefined) {


        if (change_pic) {
            const base64Data = profile_pic.replace(/^data:image\/png;base64,/, "");
            const filename = `${u_id}.png`;
            const filepath = path.join(__dirname.replace('\\controllers', ''), 'uploads', filename);
            fs.writeFile(filepath, base64Data, 'base64', (err) => {
                if (err) {
                    return res.status(500).send({ massage: 'Failed to upload profile picture', isError: true });
                }
                let img_path = `uploads/${filename}`;
                let query = `UPDATE user_profile SET f_name = '${f_name}', l_name = '${l_name}', mobile = '${mobile}', email = '${email}', address1 = '${address1}', address2 = '${address2}', country = '${country}', state_region = '${state_region}', profile_pic = '${img_path}' WHERE u_id = ${u_id};`
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
                                massage: "Profile Update Successfully"
                            }
                        );
                    }
                }));
            });

        } else {
            let query = `UPDATE user_profile SET f_name = '${f_name}', l_name = '${l_name}', mobile = '${mobile}', email = '${email}', address1 = '${address1}', address2 = '${address2}', country = '${country}', state_region = '${state_region}', profile_pic = '${profile_pic}' WHERE u_id = ${u_id};`
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
                            massage: "Profile Update Successfully"
                        }
                    );
                }
            }));
        }





    } else {
        res.status(200).json(
            {
                isError: true,
                massage: "Required data is missing"
            }
        );
    }

}

module.exports = {
    login,
    signup,
    updateProfile
}