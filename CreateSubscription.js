import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSubscription = () => {
    const [formData, setFormData] = useState({
        plan_id: '',
        total_count: '',
        // quantity: '',
        start_at: Math.floor(Date.now()/ 1000),
        // expire_by: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
        // customer_notify: '',
        // addons: [{ item: { name: "Delivery charges", amount: 30000, currency: "INR" } }],
        // notes: { notes_key_1: "Tea, Earl Grey, Hot", notes_key_2: "Tea, Earl Grey… decaf." },
        // notify_info: { notify_phone: "+9000090000", notify_email: "saivenkat299911@gmail.com" }
    });
    
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/plans');
                setPlans(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plans', error);
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/create-subscription', formData);
            alert('Subscription created successfully!');
            console.log(response.data);
            window.location.href = response.data.short_url; // Redirect to the payment page
        } catch (error) {
            alert('Error creating subscription');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create Subscription</h2>
            {loading ? (
                <p>Loading plans...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <select name="plan_id" value={formData.plan_id} onChange={handleChange} required>
                        <option value="">Select Plan</option>
                        {plans.slice(0, 3).map(plan => (
        <option key={plan.id} value={plan.id}>{plan.item.name} - {plan.item.amount / 100} {plan.item.currency}</option>
    ))}
                    </select>
                    <input type="number" name="total_count" value={formData.total_count} onChange={handleChange} placeholder="Total Count" required />
                    {/* <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required /> */}
                    {/* <input type="number" name="expire_by" value={formData.expire_by} onChange={handleChange} placeholder="Expire By (timestamp)" required /> */}
                    {/* <input type="number" name="customer_notify" value={formData.customer_notify} onChange={handleChange} placeholder="Customer Notify" required /> */}
                    
                    {/* <h3>Addons</h3>
                    <input type="text" name="addons[0].item.name" value={formData.addons[0].item.name} onChange={handleChange} placeholder="Addon Name" required />
                    <input type="number" name="addons[0].item.amount" value={formData.addons[0].item.amount} onChange={handleChange} placeholder="Addon Amount" required />
                    <input type="text" name="addons[0].item.currency" value={formData.addons[0].item.currency} onChange={handleChange} placeholder="Addon Currency" required /> */}
                    
                    {/* <h3>Notes</h3>
                    <input type="text" name="notes.notes_key_1" value={formData.notes.notes_key_1} onChange={handleChange} placeholder="Note Key 1" required />
                    <input type="text" name="notes.notes_key_2" value={formData.notes.notes_key_2} onChange={handleChange} placeholder="Note Key 2" required />
                     */}
                    {/* <h3>Notification Info</h3>
                    <input type="text" name="notify_info.notify_phone" value={formData.notify_info.notify_phone} onChange={handleChange} placeholder="Notify Phone" required />
                    <input type="email" name="notify_info.notify_email" value={formData.notify_info.notify_email} onChange={handleChange} placeholder="Notify Email" required />
                     */}
                     <br></br>
                    <button type="submit">Create Subscription</button>
                </form>
            )}
        </div>
    );
};

export default CreateSubscription;
