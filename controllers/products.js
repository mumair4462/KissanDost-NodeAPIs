const connection = require('../db/connect')
const fs = require('fs');
const path = require('path');

const addProducts = async (req, res)=>{

    res.send("all products")

}

const addnewproducts = async (req, res) => {

    const { name, price, price1, img,description } = req.body;

    if (name && price && price1 && img) {

        let query = `INSERT INTO product (img, name, description, price, price1) VALUES ('${img}', '${name}','${description}' ,'${price}', '${price1}')`
        connection.query(query,((err, result) => {
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
                        massage: "Product Added Successfully"
                    }
                );
            }
        }));

    } else {
        res.status(200).json(
            {
                isError: true,
                massage: "Product data is missing"
            }
        );
    }

}
const Updateproducts = async (req, res) => {

    const { name, price, price1, img,description,pid,change_img } = req.body;

    if (name && price && price1 && img) {
        if(!change_img){
            let query = `UPDATE product name = '${name}', description = '${description}', price = '${price}', price1 = '${price1}' WHERE pid = ${pid}`
            connection.query(query,((err, result) => {
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
                            massage: "Product Updated Successfully"
                        }
                    );
                }
            }));
        } else {
            const base64Data = img.replace(/^data:image\/png;base64,/, "");
            const filename = `${pid}.png`;
            const filepath = path.join(__dirname.replace('\\controllers', ''), 'uploads', filename);
            fs.writeFile(filepath, base64Data, 'base64', (err) => {
                if (err) {
                    return res.status(500).send({ massage: 'Failed to upload profile picture', isError: true });
                }
                let img_path = `uploads/${filename}`;
                let query = `UPDATE product img = '${img_path}',name = '${name}', description = '${description}', price = '${price}', price1 = '${price1}' WHERE pid = ${pid}`
            connection.query(query,((err, result) => {
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
                            massage: "Product Updated Successfully"
                        }
                    );
                }
            }));
            })
        
        }
     

    } else {
        res.status(200).json(
            {
                isError: true,
                massage: "Product data is missing"
            }
        );
    }

}
const getproducts =async(req,res)=>{
    let query  = 'SELECT * FROM product';
    connection.query(query,((err,result)=>{
        if (err) {
            res.status(500).json(
                {
                    isError: true,
                    massage: err.message
                }
            );
        } else {
            res.status(200).json(result);
        }

    }))
}

const Deleteproduct =async(req,res)=>{
    const { id } = req.params;
    
    let query  = `DELETE FROM product WHERE pid = '${id}' `;
    connection.query(query,((err,result)=>{
        if (err) {
            res.status(500).json(
                {
                    isError: true,
                    massage: err.message
                }
            );
        } else {
            res.status(200).json({
                isError:false,
                message:"Product Deleted"
            });
        }

    }))
}

module.exports = {
    addProducts,
    getproducts,
    Updateproducts,
    addnewproducts,
    Deleteproduct
}