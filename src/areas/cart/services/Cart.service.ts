import { PrismaClient, Cart } from "@prisma/client";
import ICartService from "./ICart.service";
export class CartService implements ICartService {
  private prisma = new PrismaClient();

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
          cartId: cartItem.cartId,
        },
      });
      return true;
    }
    return false; 
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
          cartId: cartItem.cartId,
        },
        data: {
          quantity: cartItem.quantity + 1,
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
          cartId: cartItem.cartId,
        },
        data: {
          quantity: cartItem.quantity - 1,
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
}
