"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderData {
  id: string
  items: Array<{
    id: number
    name: string
    price: number
    image: string
    quantity: number
  }>
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  estimatedDelivery: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Get order data from localStorage (in a real app, this would be from an API)
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    }
  }, [])

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-mono font-semibold text-lg">{orderData.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Calendar size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Estimated Delivery</p>
                    <p className="text-sm text-blue-600">{orderData.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">
                    {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                  </p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                    {orderData.shippingAddress.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/products" className="block">
                <Button className="w-full" size="lg">
                  Continue Shopping
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>

              <Link href="/orders" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  View All Orders
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(orderData.total - 18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping & Tax</span>
                    <span>$18.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Order Status */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">What's Next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You'll receive an email confirmation shortly</li>
                    <li>• We'll send tracking information when your order ships</li>
                    <li>• Estimated delivery: {orderData.estimatedDelivery}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
