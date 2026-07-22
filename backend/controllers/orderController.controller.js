import { Order } from "../model/order.model.js";
import { sendMail } from "../utils/sendMail.js";

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    
    if (!items || items.length === 0 || !totalAmount || !address) {
      res.status(400).json({
        message: "Inavalid Order Data",
      });
      
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        address,
        paymentId,
      });
      await order.save();
      const message = `Dear ${req.user.name} ,\n\n Thank You for Your Order!,
     Your Order Has Been Successfully Created with Folllowing Details :\n\n 
     Order Id :${order._id} \n Total Amount :${totalAmount} \n shipped address :${address} \n\n  We will Notify You  Once Your Order is Shipped .\n\n Best Regards \n\n E-COMM team`;
      await sendMail(req.user.email, "Order Created ", message);
      res.status(201).json({
        message: "Order created Successfully",
        order,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error.message);
  }
};
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("_id", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      await order.save();
      res.json({
        message: "Order status updated",
        order,
      });
    } else {
      res.status(404).json({
        message: "Order Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};
const getMyOrderById = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("items.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};

export { createOrder, getOrder, updateOrderStatus, getMyOrderById };
