import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear all existing data
  console.log("Clearing existing data...");
  await prisma.itemReview.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.productOrder.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.vendor.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.market.deleteMany({});

  console.log("Creating new data...");

  // Create Markets
  const markets = await Promise.all([
    prisma.market.create({
      data: {
        marketId: 1,
        name: "Downtown Farmers Market",
        location: "123 Main Street, Cityville",
        contact: "555-123-4567",
        email: "downtown@farmersmarket.com",
        hours: "Saturday 8am-1pm, Wednesday 4pm-7pm",
        photo:
          "https://images.unsplash.com/photo-1612305424474-403a79cc4383?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        latitude: 40.7128,
        longitude: -74.006,
      },
    }),
    prisma.market.create({
      data: {
        marketId: 2,
        name: "Riverside Organic Market",
        location: "456 River Road, Townsburg",
        contact: "555-987-6543",
        email: "info@riversidemarket.org",
        hours: "Sunday 9am-2pm, Thursday 3pm-6pm",
        photo:
          "https://images.unsplash.com/photo-1573481078935-b9605167e06b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        latitude: 34.0522,
        longitude: -118.2437,
      },
    }),
    prisma.market.create({
      data: {
        marketId: 3,
        name: "Hill Valley Farmers Collective",
        location: "789 Oak Street, Villageton",
        contact: "555-456-7890",
        email: "contact@hillvalleyfarmers.com",
        hours: "Tuesday 10am-3pm, Friday 2pm-7pm",
        photo:
          "https://images.unsplash.com/photo-1437275418715-2def52829d07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        latitude: 37.7749,
        longitude: -122.4194,
      },
    }),
  ]);

  console.log(`Created ${markets.length} markets`);

  // Create Vendors with plain text passwords
  const vendors = await Promise.all([
    // Market 1 Vendors
    prisma.vendor.create({
      data: {
        name: "Green Valley Farms",
        email: "greenvalley@gmail.com",
        password: "greenvalley123", // Plain text password
        phone: "555-111-2222",
        address: "123 Farm Road, Countryside",
        description:
          "Family-owned farm specializing in organic vegetables and free-range eggs.",
        photo:
          "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        review: "4.8",
        marketId: markets[0].marketId,
      },
    }),
    prisma.vendor.create({
      data: {
        name: "Sunrise Bakery",
        email: "sunrise@gmail.com",
        password: "sunrise123", // Plain text password
        phone: "555-222-3333",
        address: "456 Maple Avenue, Cityville",
        description:
          "Artisanal bakery offering sourdough breads, pastries, and seasonal treats.",
        photo:
          "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        review: "4.7",
        marketId: markets[0].marketId,
      },
    }),
    // Market 2 Vendors
    prisma.vendor.create({
      data: {
        name: "Riverdale Cheese Company",
        email: "riverdale@gmail.com",
        password: "riverdale123", // Plain text password
        phone: "555-333-4444",
        address: "789 Dairy Lane, Townsburg",
        description:
          "Artisanal cheese maker using traditional methods and local milk.",
        photo:
          "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        review: "4.9",
        marketId: markets[1].marketId,
      },
    }),
    prisma.vendor.create({
      data: {
        name: "Wild Honey Apiaries",
        email: "wildhoney@gmail.com",
        password: "wildhoney123", // Plain text password
        phone: "555-444-5555",
        address: "101 Blossom Road, Hillside",
        description:
          "Small-batch honey producer with various seasonal flavors from local flowers.",
        photo:
          "https://images.unsplash.com/photo-1448062885262-aa6670248b0e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        review: "4.6",
        marketId: markets[1].marketId,
      },
    }),
    // Market 3 Vendors
    prisma.vendor.create({
      data: {
        name: "Oak Hill Orchard",
        email: "oakhill@gmail.com",
        password: "oakhill123", // Plain text password
        phone: "555-555-6666",
        address: "222 Apple Way, Villageton",
        description:
          "Family orchard growing a variety of apples, pears, and stone fruits.",
        photo:
          "https://images.unsplash.com/photo-1537811465496-6c38a51d2d81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        review: "4.5",
        marketId: markets[2].marketId,
      },
    }),
    prisma.vendor.create({
      data: {
        name: "Prairie Meadow Meats",
        email: "prairie@gmail.com",
        password: "prairie123", // Plain text password
        phone: "555-666-7777",
        address: "333 Pasture Lane, Ranchville",
        description:
          "Ethical producer of grass-fed beef, free-range chicken, and heritage pork.",
        photo:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        review: "4.8",
        marketId: markets[2].marketId,
      },
    }),
  ]);

  console.log(`Created ${vendors.length} vendors`);

  // Create Products
  const products = await Promise.all([
    // Green Valley Farms Products
    prisma.product.create({
      data: {
        name: "Organic Heirloom Tomatoes",
        description:
          "Colorful mix of heirloom tomato varieties, grown organically. Great for salads and cooking.",
        quantity: 50,
        price: 4.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Vegetables",
        vendorId: vendors[0].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Fresh Free-Range Eggs",
        description:
          "Dozen eggs from our pasture-raised hens. Fed with organic feed and allowed to forage naturally.",
        quantity: 30,
        price: 6.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Dairy & Eggs",
        vendorId: vendors[0].vendorId,
      },
    }),
    // Sunrise Bakery Products
    prisma.product.create({
      data: {
        name: "Artisanal Sourdough Bread",
        description:
          "Naturally leavened sourdough bread made with organic flour. Long fermentation for better flavor and digestibility.",
        quantity: 25,
        price: 7.5,
        primaryPhoto:
          "https://images.unsplash.com/photo-1620921592619-652411a0d01a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1590301157172-7ba48dd1c2b2?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Baked Goods",
        vendorId: vendors[1].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Mixed Berry Tart",
        description:
          "Rustic pastry filled with seasonal berries and a touch of honey. Perfect for dessert or breakfast.",
        quantity: 15,
        price: 12.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Baked Goods",
        vendorId: vendors[1].vendorId,
      },
    }),
    // Riverdale Cheese Products
    prisma.product.create({
      data: {
        name: "Aged Farmhouse Cheddar",
        description:
          "Sharp cheddar aged for 12 months. Made with milk from grass-fed cows.",
        quantity: 20,
        price: 8.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1631379578550-7038263db699?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Dairy & Eggs",
        vendorId: vendors[2].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Fresh Goat Cheese with Herbs",
        description:
          "Creamy goat cheese blended with organic herbs. Perfect for salads and spreading.",
        quantity: 15,
        price: 6.99,
        primaryPhoto:
          "https://plus.unsplash.com/premium_photo-1700836214483-5f546a29d65f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Dairy & Eggs",
        vendorId: vendors[2].vendorId,
      },
    }),
    // Wild Honey Products
    prisma.product.create({
      data: {
        name: "Wildflower Honey",
        description:
          "Raw, unfiltered honey collected from diverse wildflowers. Rich in flavor and natural enzymes.",
        quantity: 40,
        price: 9.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Specialty",
        vendorId: vendors[3].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Beeswax Candles",
        description:
          "Hand-dipped 100% pure beeswax candles. Long burning with a natural honey scent.",
        quantity: 25,
        price: 12.5,
        primaryPhoto:
          "https://images.unsplash.com/photo-1673208125263-bb42a80e4965?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Crafts",
        vendorId: vendors[3].vendorId,
      },
    }),
    // Oak Hill Orchard Products
    prisma.product.create({
      data: {
        name: "Honeycrisp Apples",
        description:
          "Sweet and crisp apples perfect for eating fresh or baking. Grown using minimal spray practices.",
        quantity: 75,
        price: 3.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Fruits",
        vendorId: vendors[4].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Fresh Apple Cider",
        description:
          "Unpasteurized cider pressed from a blend of our orchard apples. No additives or preservatives.",
        quantity: 30,
        price: 7.5,
        primaryPhoto:
          "https://images.unsplash.com/photo-1668465285689-d458cde45979?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Beverages",
        vendorId: vendors[4].vendorId,
      },
    }),
    // Prairie Meadow Meats Products
    prisma.product.create({
      data: {
        name: "Grass-Fed Ground Beef",
        description:
          "Lean ground beef from cattle raised entirely on pasture. No hormones or antibiotics.",
        quantity: 20,
        price: 8.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        secondaryPhoto1:
          "https://images.unsplash.com/photo-1703034176545-9ed65e4078f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Meat",
        vendorId: vendors[5].vendorId,
      },
    }),
    prisma.product.create({
      data: {
        name: "Heritage Pork Chops",
        description:
          "Thick-cut pork chops from heritage breed pigs raised with outdoor access. Exceptionally flavorful.",
        quantity: 15,
        price: 12.99,
        primaryPhoto:
          "https://images.unsplash.com/photo-1612895572325-f029a8494bb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Meat",
        vendorId: vendors[5].vendorId,
      },
    }),
  ]);

  console.log(`Created ${products.length} products`);

  // Create Customers with plain text passwords
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        email: "alex@gmail.com",
        password: "alex123", // Plain text password
        username: "alexsmith",
        firstName: "Alex",
        lastName: "Smith",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.customer.create({
      data: {
        email: "jamie@gmail.com",
        password: "jamie123", // Plain text password
        username: "jamielee",
        firstName: "Jamie",
        lastName: "Lee",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.customer.create({
      data: {
        email: "taylor@gmail.com",
        password: "taylor123", // Plain text password
        username: "taylormartinez",
        firstName: "Taylor",
        lastName: "Martinez",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    }),
  ]);

  console.log(`Created ${customers.length} customers`);

  // Create Orders
  const today = new Date();
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(today.getDate() + 7);

  const orders = await Promise.all([
    prisma.order.create({
      data: {
        date: today.toISOString().split("T")[0],
        customerId: customers[0].customerId,
        type: "Pickup",
        total: 22.97,
        contactFirstname: "Alex",
        contactLastname: "Smith",
        contactEmail: "alex@gmail.com",
        schedule: oneWeekFromNow,
        status: "Confirmed",
      },
    }),
    prisma.order.create({
      data: {
        date: today.toISOString().split("T")[0],
        customerId: customers[1].customerId,
        type: "Delivery",
        total: 38.45,
        contactFirstname: "Jamie",
        contactLastname: "Lee",
        contactEmail: "jamie@gmail.com",
        schedule: oneWeekFromNow,
        status: "Processing",
      },
    }),
  ]);

  console.log(`Created ${orders.length} orders`);

  // Create ProductOrders
  const productOrders = await Promise.all([
    // Order 1 Items
    prisma.productOrder.create({
      data: {
        orderId: orders[0].orderId,
        productId: products[0].productId, // Organic Heirloom Tomatoes
        quantity: 2,
      },
    }),
    prisma.productOrder.create({
      data: {
        orderId: orders[0].orderId,
        productId: products[2].productId, // Artisanal Sourdough Bread
        quantity: 1,
      },
    }),
    prisma.productOrder.create({
      data: {
        orderId: orders[0].orderId,
        productId: products[4].productId, // Aged Farmhouse Cheddar
        quantity: 1,
      },
    }),
    // Order 2 Items
    prisma.productOrder.create({
      data: {
        orderId: orders[1].orderId,
        productId: products[11].productId, // Heritage Pork Chops
        quantity: 2,
      },
    }),
    prisma.productOrder.create({
      data: {
        orderId: orders[1].orderId,
        productId: products[6].productId, // Wildflower Honey
        quantity: 1,
      },
    }),
    prisma.productOrder.create({
      data: {
        orderId: orders[1].orderId,
        productId: products[3].productId, // Mixed Berry Tart (changed from Galette)
        quantity: 1,
      },
    }),
  ]);

  console.log(`Created ${productOrders.length} product orders`);

  // Create Cart Items
  const cartItems = await Promise.all([
    prisma.cart.create({
      data: {
        userId: customers[0].customerId,
        productId: products[8].productId, // Honeycrisp Apples
        quantity: 3,
      },
    }),
    prisma.cart.create({
      data: {
        userId: customers[0].customerId,
        productId: products[6].productId, // Wildflower Honey
        quantity: 1,
      },
    }),
    prisma.cart.create({
      data: {
        userId: customers[1].customerId,
        productId: products[1].productId, // Fresh Free-Range Eggs
        quantity: 1,
      },
    }),
    prisma.cart.create({
      data: {
        userId: customers[2].customerId,
        productId: products[2].productId, // Artisanal Sourdough Bread
        quantity: 2,
      },
    }),
    prisma.cart.create({
      data: {
        userId: customers[2].customerId,
        productId: products[5].productId, // Fresh Goat Cheese with Herbs
        quantity: 1,
      },
    }),
  ]);

  console.log(`Created ${cartItems.length} cart items`);

  // Create Item Reviews
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const reviews = await Promise.all([
    prisma.itemReview.create({
      data: {
        productId: products[0].productId, // Organic Heirloom Tomatoes
        userId: customers[0].customerId,
        rating: 5,
        reviewText:
          "These tomatoes are incredible! So much flavor compared to supermarket varieties. Will definitely buy again.",
        createdAt: oneMonthAgo,
      },
    }),
    prisma.itemReview.create({
      data: {
        productId: products[0].productId, // Organic Heirloom Tomatoes
        userId: customers[1].customerId,
        rating: 4,
        reviewText:
          "Great flavor and beautiful colors. A few were slightly bruised on arrival, but still delicious.",
        createdAt: twoWeeksAgo,
      },
    }),
    prisma.itemReview.create({
      data: {
        productId: products[2].productId, // Artisanal Sourdough Bread
        userId: customers[2].customerId,
        rating: 5,
        reviewText:
          "Best sourdough I've ever had! Perfect crust and wonderful tang. Stays fresh for days.",
        createdAt: twoWeeksAgo,
      },
    }),
    prisma.itemReview.create({
      data: {
        productId: products[6].productId, // Wildflower Honey
        userId: customers[0].customerId,
        rating: 5,
        reviewText:
          "Absolutely delicious honey with complex flavors. You can really taste the different flowers.",
        createdAt: new Date(),
      },
    }),
    prisma.itemReview.create({
      data: {
        productId: products[10].productId, // Grass-Fed Ground Beef
        userId: customers[1].customerId,
        rating: 4,
        reviewText:
          "Very lean and flavorful. Made great burgers with this. Will purchase again.",
        createdAt: new Date(),
      },
    }),
  ]);

  console.log(`Created ${reviews.length} product reviews`);

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
