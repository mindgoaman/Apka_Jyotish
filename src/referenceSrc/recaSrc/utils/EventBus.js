
const subscriberArr=[];

function subscribeBus(subscriber)
{
    subscriberArr.push(subscriber)
}

function unsubscribeBus(subscriber)
{
    index = subscriberArr.indexOf(subscriber)
    subscriberArr.splice(index,1)
}

function postOnBus(event)
{
    subscriberArr.forEach(subscriber=>{
        subscriber(event);
    });
}

export {subscribeBus,unsubscribeBus,postOnBus}