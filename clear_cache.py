import boto3
import os
import uuid

cloudfront = boto3.client(
    "cloudfront",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

items = ['/*']

response = cloudfront.create_invalidation(
    DistributionId=os.getenv("DISTRIBUITION"),
    InvalidationBatch={
        "Paths": {
            "Quantity": len(items),
            "Items": items
        },
        "CallerReference": str(uuid.uuid1())
    }
)

print(response)
