import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";
import { Product } from "../model/product.model.js";

const getAdminStats = async (req, res) => {
  try {
    const totalUser = await User.countDocuments({role:'user'});
    const totalOrders = await Order.countDocuments({});
    const totalProduct = await Product.countDocuments({});
    const orders = await Order.find({});
    const totalRvenueData =  orders.reduce((acc, order) => acc + order.totalAmount ,0)

    res.json({
        totalUser,
        totalOrders,
        totalProduct,
        totalRevenue :totalRvenueData
    })

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};

export { getAdminStats };
