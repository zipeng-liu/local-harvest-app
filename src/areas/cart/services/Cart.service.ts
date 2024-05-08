import { PrismaClient, Cart } from "@prisma/client";
import ICartService from "./ICart.service";
export class CartService implements ICartService {
  private prisma = new PrismaClient();

  
export class CartService implements ICartService {
  readonly _db: DBClient = DBClient.getInstance();
  
  async addProductToCart(customerId: number, productId: number, quantity: number): Promise<Cart> {
    return await this.prisma.cart.create({
      data: {
        userId: customerId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  async getCartByUserId(customerId: number): Promise<Cart[]> {
    return await this.prisma.cart.findMany({
      where: {
        userId: customerId,
      },
      include: {
        product: true,
      },
    });
  }

  async removeProductFromCart(customerId: number, productId: number): Promise<boolean> {
    const cartItem = await this.prisma.cart.findFirst({
      where: {
        userId: customerId,
        productId: productId,
      },
    });

    if (cartItem) {
      await this.prisma.cart.delete({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        },
      });
      return true;
    }
    return false; 
  }
  
  async getCartItemCount(userId: number): Promise<number> {
    try {
      const result = await this._db.prisma.cart.aggregate({
        where: {
          userId: userId,
        },
        _sum: {
          quantity: true,
        },
      });
      return result._sum.quantity || 0;
    } catch (error) {
      console.error("Failed to count cart items:", error);
      throw new Error("Unable to count cart items.");
    }
  }

  async increaseProductQuantity(customerId: number, productId: number): Promise<Cart | null> {
    const cartItem = await this.prisma.cart.findFirst({
      where: {
        userId: customerId,
        productId: productId,
      },
    });

    if (cartItem) {
      return await this.prisma.cart.update({
        where: {
          cartId: cartId,
        },
      });
    }
    return null;
  }

  async decreaseProductQuantity(customerId: number, productId: number): Promise<Cart | null> {
    const cartItem = await this.prisma.cart.findFirst({
      where: {
        userId: customerId,
        productId: productId,
      },
    });

    if (cartItem && cartItem.quantity > 1) {
      return await this.prisma.cart.update({
        where: {
          cartId: cartId,
        },
        data: {
          quantity: quantity,
        },
      });
    }
    return null;
  }

  async clearCart(customerId: number): Promise<void> {
    await this.prisma.cart.deleteMany({
      where: {
        userId: customerId,
      },
    });
  }

  async increaseCartItem(cartId: number, userId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, userId, 1);
  }

  async decreaseCartItem(cartId: number, userId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, userId, -1);
  }

  private async updateCartItemQuantity(
    cartId: number,
    userId: number,
    change: number
  ): Promise<Cart> {
    const existingCartItem = await this._db.prisma.cart.findUnique({
      where: { cartId: cartId, userId: userId },
    });
    if (!existingCartItem) {
      throw new Error("Cart item not found or does not belong to the user");
    }
    const newQuantity = existingCartItem.quantity + change;
    if (newQuantity <= 0) {
      return this.removeFromCart(cartId);
    }
    return await this._db.prisma.cart.update({
      where: { cartId: cartId },
      data: { quantity: newQuantity },
    });
  }
}
