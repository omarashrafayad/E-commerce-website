$mappings = @{
    '@/api/auth' = '@/features/auth/api/auth'
    '@/api/authh' = '@/features/auth/api/authh'
    '@/api/user' = '@/features/profile/api/user'
    '@/api/addresses' = '@/features/profile/api/addresses'
    '@/api/homeApi' = '@/features/home/api/homeApi'
    '@/api/productsApi' = '@/features/shop/api/productsApi'
    '@/api/brandApi' = '@/features/shop/api/brandApi'
    '@/api/categoryApi' = '@/features/shop/api/categoryApi'
    '@/api/wishlistApi' = '@/features/shop/api/wishlistApi'
    '@/api/cartApi' = '@/features/cart/api/cartApi'
    '@/api/orderApi' = '@/features/orders/api/orderApi'
    '@/api/clientAxios' = '@/lib/axios/clientAxios'
    '@/api/serverAxios' = '@/lib/axios/serverAxios'

    '@/hooks/Auth' = '@/features/auth/hooks/Auth'
    '@/hooks/useUser' = '@/features/profile/hooks/useUser'
    '@/hooks/useAddresses' = '@/features/profile/hooks/useAddresses'
    '@/hooks/useHome' = '@/features/home/hooks/useHome'
    '@/hooks/useProducts' = '@/features/shop/hooks/useProducts'
    '@/hooks/useBrands' = '@/features/shop/hooks/useBrands'
    '@/hooks/useCategories' = '@/features/shop/hooks/useCategories'
    '@/hooks/useWishlist' = '@/features/shop/hooks/useWishlist'
    '@/hooks/useCart' = '@/features/cart/hooks/useCart'
    '@/hooks/useOrder' = '@/features/orders/hooks/useOrder'

    '@/schemas/auth' = '@/features/auth/schemas/auth'
    '@/schemas/user' = '@/features/profile/schemas/user'
    '@/schemas/addresses' = '@/features/profile/schemas/addresses'
    '@/schemas/product' = '@/features/shop/schemas/product'
    '@/schemas/checkout' = '@/features/checkout/schemas/checkout'

    '@/store/useAuthStore' = '@/features/auth/stores/useAuthStore'

    '@/types/auth' = '@/features/auth/types/auth'
    '@/types/address' = '@/features/profile/types/address'
    '@/types/home' = '@/features/home/types/home'
    '@/types/product' = '@/features/shop/types/product'
    '@/types/cart' = '@/features/cart/types/cart'
    '@/types/order' = '@/features/orders/types/order'

    '@/components/features/Hero' = '@/features/home/components/Hero'
    '@/components/features/BenefitsSection' = '@/features/home/components/BenefitsSection'
    '@/components/features/FeaturedCategories' = '@/features/home/components/FeaturedCategories'
    '@/components/features/FeaturedProducts' = '@/features/home/components/FeaturedProducts'
    '@/components/features/NewCollections' = '@/features/home/components/NewCollections'
    '@/components/features/Testimonials' = '@/features/home/components/Testimonials'
    '@/components/features/ShopFilters' = '@/features/shop/components/ShopFilters'

    '@/components/login-form' = '@/features/auth/components/login-form'
    '@/components/signup-form' = '@/features/auth/components/signup-form'
    '@/components/AuthInitializer' = '@/features/auth/components/AuthInitializer'
    '@/components/profileSection' = '@/features/profile/components/profileSection'
    '@/components/addressesSection' = '@/features/profile/components/addressesSection'
    '@/components/securitySection' = '@/features/profile/components/securitySection'
    '@/components/orderSetion' = '@/features/profile/components/orderSetion'
    '@/components/navButton' = '@/components/shared/navButton'
}

Get-ChildItem -Recurse -Include *.ts, *.tsx | ForEach-Object {
    $filePath = $_.FullName
    $content = [System.IO.File]::ReadAllText($filePath)
    $changed = $false
    foreach ($key in $mappings.Keys) {
        $escapedKey = [regex]::Escape($key)
        if ($content -match $escapedKey) {
            $content = $content -replace $escapedKey, $mappings[$key]
            $changed = $true
        }
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($filePath, $content)
    }
}
