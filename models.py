import numpy as np

class SIR:
    def __init__(self, beta, gamma, N):
        self.beta = beta
        self.gamma = gamma
        self.N = N
    
    def ds_dt(self, I, S):
        return -(self.beta * I * S) / self.N
    
    def di_dt(self, I, S):
        return (self.beta * I * S) / self.N - self.gamma * I
    
    def dr_dt(self, I, S):
        return self.gamma * I