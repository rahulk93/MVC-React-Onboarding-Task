using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MVPStudioReactTemplate.Context;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MVPStudioReactTemplate.Models
{
    public class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            using (var context = new TalentDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<TalentDbContext>>()))
            {
                // Look for old data
                if (context.Customers.Any())
                {
                    return; // Db has been initialized
                }
                if (context.Products.Any())
                {
                    return; // Db has been initialized
                }
                if (context.Sales.Any())
                {
                    return; // Db has been initialized
                }
                if (context.Stores.Any())
                {
                    return; // Db has been initialized
                }

                // Create Customers
                await context.Customers.AddRangeAsync(
                    new Customer()
                    {
                        Name = "George",
                        Address = "122 Kings Road, New Zealand"
                    },
                    new Customer()
                    {
                        Name = "Rahul",
                        Address = "151 Private Drive, New Zealand"
                    },
                    new Customer()
                    {
                        Name = "Douglas",
                        Address = "86 Queens Drive, Japan"
                    },
                    new Customer()
                    {
                        Name = "Mitchell",
                        Address = "762 Pukutua Road, New Zealand"
                    },
                    new Customer()
                    {
                        Name = "Suminder",
                        Address = "221b Baker Street, Canada"
                    },
                    new Customer()
                    {
                        Name = "Amish",
                        Address = "69 Lynmore Avenue, USA"
                    }
                );

                // Create Products
                await context.Products.AddRangeAsync(
                    new Product()
                    {
                        Name = "Tablet",
                        Price = 89.99m
                    },
                    new Product()
                    {
                        Name = "Phone",
                        Price = 299.95m
                    },
                    new Product()
                    {
                        Name = "Tablet Cover",
                        Price = 10.00m
                    },
                    new Product()
                    {
                        Name = "Phone Casing",
                        Price = 5.00m
                    }
                );

                // Create Stores
                await context.Stores.AddRangeAsync(
                    new Store()
                    {
                        Name = "Japan",
                        Address = "Tokyo"
                    },
                    new Store()
                    {
                        Name = "New Zealand",
                        Address = "Auckland"
                    },
                    new Store()
                    {
                        Name = "United Kingdom",
                        Address = "London"
                    },
                    new Store()
                    {
                        Name = "Malaysia",
                        Address = "Kedah"
                    },
                    new Store()
                    {
                        Name = "India",
                        Address = "Chennai"
                    }
                );

                // Save changes
                await context.SaveChangesAsync();


                // Create Sales
                Random random = new Random();
                await context.Sales.AddRangeAsync(
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Amish"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Phone"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Douglas"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "Japan")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Amish"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Phone"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Mitchell"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Rahul"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet Cover"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "George"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"), 
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)).ToString("yyyy-MM-dd"),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Rahul" && c.Address == "151 Private Drive, New Zealand"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "New Zealand")
                    }
                );

                // Save changes
                await context.SaveChangesAsync();
            }
        }
    }
}