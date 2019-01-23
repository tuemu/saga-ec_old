import Order from '../models/Order';

export const getOrders = (event, context, callback) => {
  Order.scan()
    .exec()
    .then(orders =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(orders)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        })
      })
    );
};

export const getOrder = (event, context, callback) => {
  const { id } = event.pathParameters;

  Order.get(id)
    .then(
      order =>
        order
          ? callback(null, {
              statusCode: 200,
              body: JSON.stringify(order)
            })
          : callback(null, {
              statusCode: 404
            })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        })
      })
    );
};

export const addOrder = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const { userName, itemName, price, quantity, completed } = JSON.parse(body);
  if (!userName) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: `The property "userName" is required.`
      })
    });
  }

  if (!itemName) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: `The property "itemName" is required.`
      })
    });
  }

  if (!price) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: `The property "price" is required.`
      })
    });
  }

  if (!quantity) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: `The property "quantity" is required.`
      })
    });
  }

  const newOrder = new Order({ userName, itemName, price, quantity, completed });
  newOrder
    .save({ overwrite: false })
    .then(addedOrder =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(addedOrder)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        })
      })
    );
};

export const removeOrder = (event, context, callback) => {
  const { id } = event.pathParameters;

  Order.delete({ id })
    .then(() =>
      callback(null, {
        statusCode: 204
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        })
      })
    );
};

export const updateOrder = (event, context, callback) => {
  const { id } = event.pathParameters;
  const { userName, completed } = JSON.parse(event.body);
  let order = {};
  if (userName) order.userName = userName;
  if (itemName) order.itemName = itemName;
  if (userName) order.userName = userName;
  if (price) order.price = price;
  if (quantity) order.quantity = quantity;
  if (completed) order.completed = completed;

  Order.update({ id }, { $PUT: Order })
    .then(updatedOrder =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(updatedOrder)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        })
      })
    );
};