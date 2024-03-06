import nodemailer from "nodemailer"
const sendMail = async (req, res) => {
  const { name,hotelname } = req.query;

  let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
    secure:false,
    auth: {
        user: 'kunjfuletra007@gmail.com',
        pass: 'mzyx ypxk gszt erbl',
    },
  });
  
  let info = await transporter.sendMail({
    from: '"BookVista 👻" <kunjfuletra007@gmail.com>', // sender address
        to: "kunjfuletra123@gmail.com", // list of receivers
        subject: "Room reservation", // Subject line
        text: "hello this is text", // plain text body
        html: `<p>Hello ${name} <br> Your Room reservation at ${hotelname} has been confirmed</p> `, 
    });
    
  console.log("Message sent: %s", info.messageId);
  res.json(true);
};

export default sendMail