from pydantic import BaseModel

# Define schema
class Diagnosis(BaseModel):
    No_Pation:float
    AGE:float
    Urea:float
    Creatinine_ratio:float
    HbA1c:float
    Cholesterol:float
    Triglycerides:float
    HDL_Cholesterol:float
    Low_density_lipoprotein:float
    VLDL:float
    BMI:float
